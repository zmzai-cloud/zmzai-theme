import { Button } from "../src/components/button";
import { Input } from "../src/components/input";
import { Card, CardHeader, CardBody, CardFooter } from "../src/components/card";
import { Logo } from "../src/brand/logo";
import { Wordmark } from "../src/brand/wordmark";

export function Playground() {
  return (
    <div className="min-h-screen bg-bg p-12">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Brand */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Brand</h2>
          <div className="flex items-center gap-4">
            <Logo size={32} />
            <Wordmark />
            <Wordmark sublabel="relay" />
            <Wordmark size={24} weight={700} />
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Button</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Input</h2>
          <div className="space-y-3 max-w-md">
            <Input placeholder="Default input…" />
            <Input variant="brutal" placeholder="Brutal input…" />
            <Input size="sm" placeholder="Small input…" />
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Card</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card padding="lg">
              <h3 className="mb-1 font-semibold">Default Card</h3>
              <p className="text-sm text-ink-2">Static white card with light border.</p>
            </Card>
            <Card variant="interactive" animatedHover padding="lg">
              <h3 className="mb-1 font-semibold">Interactive Card</h3>
              <p className="text-sm text-ink-2">Hover me — I lift up.</p>
            </Card>
            <Card variant="surface" padding="lg">
              <h3 className="mb-1 font-semibold">Surface Card</h3>
              <p className="text-sm text-ink-2">Grey background for nested panels.</p>
            </Card>
            <Card padding="none">
              <CardHeader>
                <span className="font-semibold">Card with Header/Footer</span>
                <Button size="sm" variant="ghost">Action</Button>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-ink-2">Body content goes here.</p>
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="secondary">Cancel</Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
