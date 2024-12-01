import React, { useState } from "react";
import LiveTable from "./LiveTable";
import LiveChart from "./LiveChart";
import { useLiveChartContext } from "../hooks/useLiveChartContext";

const Content = () => {
  const { data } = useLiveChartContext();
  const [editableCell, setEditableCell] = useState<{
    index: number | null;
    field: string | null;
  }>({
    index: null,
    field: null,
  });

  const handleChartClick = (index: number) => {
    const event = data.events.find((event: any) => event.index === index);
    if (event) {
      setEditableCell({ index, field: "value1" });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-8">
      <LiveChart onChartClick={handleChartClick} />
      <LiveTable
        editableCell={editableCell}
        setEditableCell={setEditableCell}
      />
    </div>
  );
};

export default Content;
