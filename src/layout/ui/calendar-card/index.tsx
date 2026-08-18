interface CalendarCardProps {
  day: string;
  weekday: string;
  events: {
    title: string;
    time?: string;
  }[];
  backgroundColor?: string;
}

const CalendarCard = ({
  day,
  weekday,
  events,
  backgroundColor = "#F4C430",
}: CalendarCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg min-w-[200px]">
      <div className="p-4 text-center text-white" style={{ backgroundColor }}>
        <div
          className="text-3xl font-bold font-fjalla"
          style={{ fontFamily: "'Fjalla One', sans-serif" }}
        >
          {day}
        </div>
        <div
          className="text-sm uppercase tracking-wider"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          {weekday}
        </div>
      </div>

      <div className="bg-white p-4">
        {events.map((event, index) => (
          <div key={index} className="mb-3 last:mb-0">
            <h4
              className="font-semibold text-sm"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {event.title}
            </h4>
            {event.time && (
              <p
                className="text-xs text-gray-600"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {event.time}
              </p>
            )}
          </div>
        ))}
        {events.length === 0 && (
          <p
            className="text-sm text-gray-400 italic"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Sem jogos
          </p>
        )}
      </div>
    </div>
  );
};

export default CalendarCard;
