import React, { useEffect, useState } from "react";
import { getAllClassSchedule } from "../utils/api";
import { Loader } from "lucide-react";

const AdminClassSchedule = () => {
  const [classes, setClasses] = useState([]);
  const [times, setTimes] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true)
    const res = await getAllClassSchedule();
    const data = res.data.data;

    // unique class types
    const classTypes = [...new Set(data.map(item => item.class))];
    setClasses(classTypes);

    // unique time slots
    const timeSlots = [...new Set(data.map(item => item.time))];
    setTimes(timeSlots);

    // build schedule object
    const structuredSchedule = {};

    classTypes.forEach(type => {
      structuredSchedule[type] = {};
    });

    data.forEach(item => {
      structuredSchedule[item.class][item.time] = {
        available: item.available,
        trainer: item.trainingName,
        userId: item.userId
      };
    });

    setSchedule(structuredSchedule);
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 text-gray-200">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        Class Schedule Overall view
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-[#1a1a1a]">
              <th className="p-3 text-left">Time</th>
              {classes.map(cls => (
                <th key={cls} className="p-3 text-center capitalize">
                  {cls.replace("-", " ")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {times.map(time => (
              <tr key={time} className="border-t border-gray-700">
                <td className="p-3 text-sm text-gray-400">
                  {time}
                </td>

                {classes.map(cls => {
                  const cell = schedule[cls]?.[time];

                  return (
                    <td key={cls} className="p-2 text-center">
                      {cell ? (
                        <div
                          className={`rounded-md px-3 py-2 text-sm ${cell.available
                              ? ""
                              : "bg-gray-800"
                            }`}
                        >
                          <div className="font-medium">
                            {cell.available ? "Available" : "Booked"}
                          </div>
                          <div className="text-xs">
                            {cell.trainer}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-600 text-xs">
                          —
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex items-center gap-2">
            <Loader className="animate-spin text-white" size={24} />
            <span className="text-white">Loading...</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminClassSchedule;
