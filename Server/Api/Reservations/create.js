const prisma = require('../../prisma/prismaInstance')
const {verify} = require('jsonwebtoken');
const { isAfter, startOfToday, getMinutes, getHours, parseISO } = require('date-fns');

const create = (req, res) => {
    let { path, DepartureDateTime, ReturnDateTime, travelers, luxury } = req.body;
    console.log("dep",DepartureDateTime);
    let token = req.header('Authorization')?.split(' ')[1];
    try{
        if(token)
        {
            verify(token,process.env.JWT_SECRET,async (err,decodedToken)=>{
                if(!err)
                {
                    //Done: Get the period that includes the actual date
                    let currentDate = new Date();
                    try {
                        let period = await prisma.period.findMany({
                            where:{
                                start:{
                                    lte: currentDate
                                },
                                end:{
                                    gte: currentDate
                                }
                            }
                        })
                        if(period)
                        {
                            // Doing: add automatic extras
                            try {
                                
                                
                                let autoExtra = await prisma.extra.findFirstOrThrow({
                                    where:{
                                        AND:[
                                            {
                                                type:{
                                                    label: "Automatic"
                                                },
                                                label :{
                                                    contains: "midnight"
                                                }
                                            }
                                        ]
                                    }
                                })
                                if(autoExtra)
                                {                                    
                                    let date = parseISO(DepartureDateTime)
                                    const hour = getHours(date);
                                    const minutes = getMinutes(date);
                                    let extraToAdd;;
                                    // Check if the time is before 8:30 AM or after 9:00 PM
                                    if (hour < 8 || (hour === 8 && minutes < 30) || hour >= 21) {
                                        //Done: The time is outside of work hours
                                        console.log("out of work hours");
                                        extraToAdd=autoExtra.id;
                                    }
                                    try {
                                        let reservation = await prisma.reservation.create({
                                            data:{
                                                ReservationDate: DepartureDateTime,
                                                ReturnDate: ReturnDateTime,
                                                Travelers: travelers,
                                                Luxury: luxury,
                                                client: {
                                                    connect: {
                                                        userId: decodedToken.client.userId
                                                    }
                                                },
                                                transferPath:{
                                                    connect:{
                                                        id: path
                                                    }
                                                },
                                                //Done: Assign a period based on the actual date X periods dates
                                                period:{
                                                    connect:{
                                                        id: period[0].id
                                                    }
                                                },
                                                extras:{
                                                    connect:{
                                                        id: extraToAdd??undefined,
                                                        label_typeId:{
                                                            typeId: autoExtra.typeId,
                                                        }
                                                    } 
                                                }
                                            }
                                        })
                                        if(reservation) return res.status(200).json(reservation)
                                    } catch (error) {
                                        console.log(error);
                                        throw error
                                    }
                                }
                            } catch (err) {
                                console.log(err);
                                throw err;
                            }
                        }
                    } catch (err) {
                        console.log(err);
                        throw err;
                    } 
                       
                }
                else
                {
                    throw 'Error Extracting ClientId from the Token. Contact the Super Admin';
                }
            })
        }
        else
        {
            throw 'Error Extracting ClientId from the Token. Contact the Super Admin';
        }
    }
    catch(err)
    {
        return res.status(500).json(err)
    }
}

module.exports = { create }