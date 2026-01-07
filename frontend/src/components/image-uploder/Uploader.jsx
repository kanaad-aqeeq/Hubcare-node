import React, { useState,useRef,useEffect } from 'react';

const Uploader = () => {

    const [imagesFiles, setImagesFiles] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setImagesFiles((prevFiles) => [...prevFiles, { file, url: event.target.result }]);
            };

            reader.readAsDataURL(file);
        }
    };

    const removeFiles = (url) => {
        const filteredFiles = imagesFiles.filter((item) => item.url !== url);
        setImagesFiles(filteredFiles);
    };
    

    return (
        <div className="fileuploder-main">
            <label htmlFor="dropzone-file" className="fileuploder-label">
                <div className="fileuploder-label-inner">
                    <svg className="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="uploder-descrp"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="uploder-note"> PNG, JPG  (MAX. 800x400px)</p>
                </div>
                <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
            </label>

            {/* images main box */}
            <div className='fileuplodr-list'>
                {imagesFiles && imagesFiles.map((item,idx)=>{
                    return(
                        // particular one image
                    <div className='filuploadr-image'>
                        <span onClick={()=>{removeFiles(item.url)}} className='fileclose-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" className='text-white' height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>
                        </span>
                        {/* <img src={item.url} className='' alt="" /> */}
                        <em style={{ backgroundImage: `url(${item.url})` }}></em>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Uploader;
