import { memo, ReactNode } from "react";
import { Card } from "react-bootstrap";

export const ErrorCard = memo(({ text }: { text: ReactNode }) => {
  return (
    <Card className="mt-4">
      <h2 className="m-auto mb-3 mt-3 p-5">{text}</h2>
    </Card>
  );
});
