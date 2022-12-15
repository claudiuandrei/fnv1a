# fnv1a

[FNV-1a](https://en.wikipedia.org/wiki/Fowler–Noll–Vo_hash_function) is a [fast non-cryptographic hash function with great distribution rare collisions](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633).

## Usage Deno

```ts
import fnv1a from "https://deno.land/x/fnv1a/mod.ts";
```

## Usage Node

This is a port of [@sindresorhus/fnv1a](https://github.com/sindresorhus/fnv1a), through the code is different slightly by using the newer TextEncoder standard.

```js
import fnv1a from "@denox/fnv1a";

fnv1a("🦄🌈", { size: 32 });
//=> 2_868_248_295n

fnv1a("🦄🌈", { size: 128 });
//=> 13_487_074_350_300_261_116_944_693_128_525_960_095n

Number(fnv1a("🦄🌈", { size: 32 }));
//=> 2_868_248_295
```

## API

### fnv1a(string, options?)

Returns the hash as a positive `BigInt`.

If you need it as a `number`, use `32` as `size` and wrap the return value in `Number(…)`.

#### options

Type: `object`

##### size

Type: `number`\
Values: `32 | 64 | 128 | 256 | 512 | 1024`\
Default: `32`

The bit size of the hash.
