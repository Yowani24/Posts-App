// import React, { useState } from "react";
// import {
//   addDays,
//   format,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   isSameDay,
//   isWithinInterval,
// } from "date-fns";

// interface CalendarProps {
//   initialDate: Date;
//   endDate: Date;
// }

// const Calendar: React.FC<CalendarProps> = ({ initialDate, endDate }) => {
//   const [selectedMonth, setSelectedMonth] = useState<number>(
//     new Date().getMonth()
//   ); // Get the current month

//   const currentYear = new Date().getFullYear();
//   const firstDayOfMonth = startOfMonth(new Date(currentYear, selectedMonth));
//   const lastDayOfMonth = endOfMonth(new Date(currentYear, selectedMonth));

//   // Get all days in the selected month
//   const daysInMonth = eachDayOfInterval({
//     start: firstDayOfMonth,
//     end: lastDayOfMonth,
//   });

//   // Handle month selection
//   const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedMonth(parseInt(e.target.value));
//   };

//   return (
//     <div className="p-4">
//       {/* Month Selector */}
//       <div className="mb-4">
//         <select
//           value={selectedMonth}
//           onChange={handleMonthChange}
//           className="border p-2 rounded"
//         >
//           {Array.from({ length: 12 }).map((_, i) => (
//             <option key={i} value={i}>
//               {format(new Date(currentYear, i), "MMMM")}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Calendar Grid */}
//       <div className="grid grid-cols-7 gap-2">
//         {/* Weekday Header */}
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//           <div key={day} className="text-center font-bold">
//             {day}
//           </div>
//         ))}

//         {/* Days in the Month */}
//         {daysInMonth.map((day) => {
//           const isWithinRange = isWithinInterval(day, {
//             start: initialDate,
//             end: endDate,
//           });
//           const isStart = isSameDay(day, initialDate);
//           const isEnd = isSameDay(day, endDate);

//           return (
//             <div
//               key={day.toString()}
//               className={`p-2 text-center border rounded ${
//                 isWithinRange ? "bg-blue-200" : "bg-gray-100"
//               } ${isStart ? "border-l-4 border-blue-500" : ""} ${
//                 isEnd ? "border-r-4 border-blue-500" : ""
//               }`}
//             >
//               {format(day, "d")}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Calendar;

import React, { useState } from "react";
import {
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale"; // Import Portuguese locale

interface CalendarProps {
  initialDate: Date;
  endDate: Date;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate, endDate }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  ); // Get the current month

  const currentYear = new Date().getFullYear();
  const firstDayOfMonth = startOfMonth(new Date(currentYear, selectedMonth));
  const lastDayOfMonth = endOfMonth(new Date(currentYear, selectedMonth));

  // Get all days in the selected month
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Handle month selection
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  return (
    <div className="p-4">
      {/* Month Selector */}
      <div className="mb-4">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border p-2 rounded"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {format(new Date(currentYear, i), "MMMM", { locale: ptBR })}{" "}
              {/* Format month in Portuguese */}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Weekday Header */}
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}

        {/* Days in the Month */}
        {daysInMonth.map((day) => {
          const isWithinRange = isWithinInterval(day, {
            start: initialDate,
            end: endDate,
          });
          const isStart = isSameDay(day, initialDate);
          const isEnd = isSameDay(day, endDate);

          return (
            <div
              key={day.toString()}
              className={`p-2 text-center border rounded ${
                isWithinRange ? "bg-blue-200" : "bg-gray-100"
              } ${isStart ? "border-l-4 border-blue-500" : ""} ${
                isEnd ? "border-r-4 border-blue-500" : ""
              }`}
            >
              {format(day, "d", { locale: ptBR })}{" "}
              {/* Format day number in Portuguese */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
