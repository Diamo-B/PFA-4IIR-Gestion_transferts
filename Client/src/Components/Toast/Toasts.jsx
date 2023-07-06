import { useEffect } from 'react';
import Toast from './Toast';

const Toasts = ({contents, trigger, reload }) => {
    
    return (
        <>  
            {
                <div className="absolute z-50 right-5 bottom-5 flex flex-col gap-2">
                    {
                        contents && contents.length > 1 ?
                                (
                                    contents.map((content, index) => (
                                        <Toast key={index} Type={content.type} Message={content.msg} trigger={trigger} reload={reload} />
                                    ))
                                )
                        :
                            <Toast Type={contents.type} Message={contents.msg} trigger={trigger} reload={reload} />
                    }
                </div>
            }
        </>
    );
}
 
export default Toasts;