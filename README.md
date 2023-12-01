# Substreams Sink Database Changes

> [Buf](https://buf.build/) Protobuf codegen & [TypeBox](https://github.com/sinclairzx81/typebox) for [`DatabaseChanges`](https://github.com/streamingfast/substreams-sink-database-changes).

## Quickstart

```bash
$ npm install @substreams/sink-database-changes
```

```typescript
import { typebox, zod } from "@substreams/sink-database-changes"
```

## Protobuf

```proto
message DatabaseChanges {
  repeated TableChange table_changes = 5;
}

message TableChange {
  string table = 1;
  oneof primary_key {
    string pk = 2;
    CompositePrimaryKey composite_pk = 6;
  }
  uint64 ordinal = 3;
  Operation operation = 4;
  repeated Field fields = 5;
}

message Field {
  string name = 1;
  string new_value = 2;
  string old_value = 3;
}
```

### Using [TypeBox](https://github.com/sinclairzx81/typebox) Static Type Resolution

```typescript
import { DatabaseChanges } from "@substreams/sink-entity-changes/typebox"
...

const emitter = new BlockEmitter(transport, request, registry);

emitter.on("anyMessage", (message: DatabaseChanges) => {
  for ( const tableChange of message.table_changes ?? []) {
    console.log(tableChange);
  }
});
```

### Using [Zod](https://github.com/colinhacks/zod) Static Type Resolution

```typescript
import { DatabaseChanges } from "@substreams/sink-entity-changes/zod"
...

const emitter = new BlockEmitter(transport, request, registry);

emitter.on("anyMessage", (message: DatabaseChanges) => {
  for ( const tableChange of message.table_changes ?? []) {
    console.log(tableChange);
  }
});
```

### Using [Buf](https://github.com/bufbuild/protobuf-es) Protobuf codegen

```typescript
import { DatabaseChanges } from "@substreams/sink-entity-changes/entity_pb"
...

const emitter = new BlockEmitter(transport, request, registry);

// Stream DatabaseChanges
emitter.on("output", (output: DatabaseChanges) => {
  for ( const tableChange of output?.table_changes ?? []) {
    console.log(tableChange);
  }
});
```