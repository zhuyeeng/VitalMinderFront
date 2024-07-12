import React, { useEffect, useState } from 'react';
import { fetchPatients } from '../../lib/axios';

const PatientTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchPatients();
                console.log('Fetched patients data:', response);
                if (response && Array.isArray(response.patients)) {
                    setData(response.patients);
                } else {
                    throw new Error('Data is not an array');
                }
            } catch (error) {
                console.error('Error fetching patients data:', error);
                setError('Error fetching patients data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex flex-col md:flex-row w-2/3'>
            <div className="flex-1 max-h-[50rem] overflow-y-auto bg-gray-500 p-4 rounded-lg shadow-lg h-[29rem]">
                <h5 className="text-xl font-bold mb-4 text-black">Total Patient Information</h5>
                <div className="w-full bg-gray-400 rounded-lg shadow-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-32 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-32 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Gender</th>
                                <th className="px-32 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Registered Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-300 divide-y divide-gray-700">
                            {data.map((patient) => (
                                <tr key={patient.id}>
                                    <td className="px-32 py-4 whitespace-nowrap text-black">{patient.username}</td>
                                    <td className="px-32 py-4 whitespace-nowrap text-black">{patient.gender}</td>
                                    <td className="px-32 py-4 whitespace-nowrap text-black">{new Date(patient.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientTable;
