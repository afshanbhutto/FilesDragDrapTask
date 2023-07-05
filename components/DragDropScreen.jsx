import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addFile } from '../redux/filesSlice';
import SelectedFilesList from "./SelectedFilesList"

const DragDropScreen = ({ children }) => {
    const dispatch = useDispatch();
    const [isDragging, setIsDragging] = useState(false);
    const [showLinkInfo, setShowLinkInfo] = useState(false);
    const files = useSelector((state) => state.files);
    function handleGetLinkClick() {
        setShowLinkInfo(true);
    }
    const handleSelectFilesClick = () => {
        // Trigger the file input element when the "Select files" button is clicked
        document.getElementById("file-input").click();
    };
    const handleFilesSelect = (event) => {
        const fileList = Array.from(event.target.files);
        dispatch(addFile(fileList));
    };
    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        dispatch(addFile(files));
    };

    return (
        <div
            className={`border-box flex flex-row md:flex-col p-4 w-screen justify-center h-screen ${isDragging ? 'bg-blue-200' : 'bg-white'
                }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className='flex gap-2 flex-col md:flex-row'>
                <div className='bg-black text-white flex flex-col rounded-md p-4 w-full md:w-[300px] h-[300px]'>
                    {/* For Drag and drop */}
                    <h1 className="text-2xl  mb-4">Drag and Drop Files</h1>
                    {isDragging ? (
                        <p className=" text-white">Drop files here</p>
                    ) : (
                        <>
                            <p className=" text-white">Drag files here </p>
                            <p>OR</p>
                            <div className="uppercase text-yellow-700 flex flex-col w-full justify-start">
                                <button
                                    className="uppercase flex items-start"
                                    onClick={handleSelectFilesClick}
                                >
                                    Select files
                                </button>
                            </div>

                            <input
                                id="file-input"
                                type="file"
                                multiple
                                onChange={handleFilesSelect}
                                style={{ display: "none" }}
                            />

                        </>
                    )}

                    {/* to display file names */}
                    <ul className="list-disc pl-6">
                        {files.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                    {/* to display GET a link button */}
                    {files.length > 0 && (
                        <div className="mt-2 text-center flex flex-col">
                            <button
                                className="text-yellow-700 text-xl py-2 px-4 rounded uppercase tracking-[4px] text-center"
                                onClick={handleGetLinkClick}
                            >
                                Get a Link
                            </button>
                        </div>
                    )}

                </div>

                {/* conitionally rendering SelectedFilesList component */}
                <div className='rounded-md min-h-[300px]'>
                    {showLinkInfo && <SelectedFilesList selectedFiles={files} />}
                </div>
                <div className='rounded-md min-h-[300px]'>
                    {children}

                </div>

            </div>

        </div>
    );
};

export default DragDropScreen;
