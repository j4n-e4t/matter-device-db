# Contributing

Thanks for your interest in contributing to the Matter Device Database!

## Ways to Contribute

### Add a Device (Easy)

**Option 1: Open an Issue**

If you're not comfortable editing JSON, just [open an issue](../../issues/new?template=new-device.yml) with the device details. Someone will add it for you.

**Option 2: Submit a PR**

1. Fork this repository
2. Add your device to `data/devices.json`
3. Add the brand to `data/brands.json` if it doesn't exist
4. Submit a pull request

### Device Entry Format

```json
{
  "id": "brand-product-name",
  "name": "Product Display Name",
  "brand_id": "brand",
  "capabilities": ["light", "dimmer"],
  "protocols": ["thread"],
  "powerSupply": "mains",
  "matterSupport": "native",
  "imageUrl": "https://example.com/image.jpg",
  "productUrl": "https://example.com/product",
  "contributors": ["your-github-username"],
  "meta": {
    "last_updated": "2026-02-02"
  }
}
```

### Field Reference

| Field           | Required | Description                                     |
| --------------- | -------- | ----------------------------------------------- |
| `id`            | Yes      | Unique identifier (lowercase, hyphens)          |
| `name`          | Yes      | Human-readable product name                     |
| `brand_id`      | Yes      | Reference to brand in `brands.json`             |
| `capabilities`  | Yes      | Array of device capabilities                    |
| `protocols`     | Yes      | Supported protocols (thread, wifi, bluetooth)   |
| `powerSupply`   | Yes      | Power source (mains, battery)                   |
| `matterSupport` | Yes      | Support type (native, bridge)                   |
| `imageUrl`      | No       | Product image URL                               |
| `productUrl`    | No       | Official product page                           |
| `contributors`  | Yes      | GitHub usernames who added/verified this device |

### Capabilities

See `data/capabilities.tsx` for the full list. It may change over time.

### Guidelines

- Verify the device actually supports Matter before adding
- Use official product images when possible
- Add yourself to the `contributors` array
- Update `meta.last_updated` when modifying entries

## Other Contributions

Found a bug? Have a feature idea? Want to improve the UI? PRs and issues are welcome for those too. There's no formal process - just open an issue or PR and we'll figure it out.

## Development Setup

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your changes.
