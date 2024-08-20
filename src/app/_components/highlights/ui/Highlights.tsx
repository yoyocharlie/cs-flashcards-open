import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Layers, ListTodo, TabletSmartphone } from "lucide-react";

export function Highlights() {
  return (
    <section className="my-12 grid grid-cols-1 gap-8 md:grid-cols-3">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="space-x-3">
            <Layers className="inline" />
            <span>Custom Decks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Create and organize your own decks for any subject.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="space-x-3">
            <ListTodo className="inline" />
            <span>Progress Tracking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Track your learning progress and improve over time.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="space-x-3">
            <TabletSmartphone className="inline" />
            <span>Mobile Friendly</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Access your flashcards anywhere, anytime on any device.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
