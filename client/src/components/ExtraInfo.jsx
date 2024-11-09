import React from 'react';

export default function ExtraInfo({ extraInfo }) {
    return (
        <div className="flex-1 bg-slate-300 p-4 rounded-2xl shadow-md">
            <strong className="text-xl">Extra Info:</strong><br />
            <ul className="list-disc list-inside">
                {extraInfo && extraInfo.length > 0 ? (
                    extraInfo.map((sen, index) => (
                        <li key={index} className="text-gray-950">{sen}</li>
                    ))
                ) : (
                    <li className="text-gray-500">No extra information available.</li>
                )}
            </ul>
        </div>
    );
}
