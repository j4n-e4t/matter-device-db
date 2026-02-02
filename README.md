# Matter Device Database

![Screenshot](assets/page.png)

A community-driven catalog of Matter-compatible smart home devices. Browse devices, filter by capabilities, protocols, and brands.

## Why?

I was looking for a site just like this and couldn't find anything that had all the info, was up to date or remotely pleasant to use. That's why I built my own.

## Quick Start

```bash
# Install dependencies
bun install

# Run development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the database.

## Contributing

Want to add a device? See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

**Quick options:**
- [Open an issue](../../issues/new?template=new-device.yml) - fill out a form, someone else adds it
- [Submit a PR](CONTRIBUTING.md#add-a-device-easy) - edit `data/devices.json` yourself

## Development

```bash
bun run dev    # Start dev server
bun run build  # Production build
bun run lint   # Run linter
```

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [TanStack Table](https://tanstack.com/table) - Data table

## License

MIT - See [LICENSE](LICENSE) for details.
