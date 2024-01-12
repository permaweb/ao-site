# Protocol Specification of the `ao` Computer.

**Status:** DRAFT-2
**Targeting Network:** ao.TN.1

## What is `ao`?

The `ao` computer is the [actor oriented](https://en.wikipedia.org/wiki/Actor_model) machine that emerges from the network of nodes that adhere to its core data protocol, running on the [Arweave](https://arweave.org) network. This document gives a brief introduction to the protocol and its functionality, as well as its technical details, such that builders can create new implementations and services that integrate with it.

The `ao` computer is a single, unified computing environment (a [Single System Image](https://en.wikipedia.org/wiki/Single_system_image)), hosted on a heterogenous set of nodes in a distributed network. `ao` is designed to offer an environment in which an arbitrary number of paralell processes can be resident, coordinating through an open message passing layer. This message passing standard connects the machine's indepedently operating processes together into a 'web' -- in the same way that websites operate on independent servers but are conjoined into a cohesive, unified experience via hyperlinks.

Unlike existing decentralized compute systems, `ao` is capable of supporting the operation of computation without protocol-enforced limitations on size and form, while also maintaining the verifiability (and thus, trust minimization) of the network itself. Further, `ao`'s distributed and modular architecture allows existing smart contract platforms to easily 'plug in' to the network, acting as a single process which can send and recieve messages from any other process.

Instead of enforcing one set of choices upon all users of the computing environment, `ao` is built in a modular form: Allowing users to choose which virtual machines, sequencing decentralization trade-offs, message passing security guarantees, and payment options work best for them. This modular environment is then unified by the eventual settlement of all messages -- each sharing the same format -- onto Arweave's decentralized data layer. This modularity creates a unified computing environment suiting an extremely wide set of workloads, in which every process can easily transfer messages and cooperate.

`ao`'s core ojective is to enable trustless and cooperating compute services without any practical bounds on scale. This allows for a radically new design space of applications that were not previously possible: Blending the benefits of smart contract applications (services without requiring trust in anything but code), and traditional compute environments (Amazon EC2, etc).

Due to its scalability, the natural way for developers to use `ao` is to spawn their own command-line (`aos`) process inside the network, and to start issuing commands. This DevX is similar to how developers create a new server instance at a cloud host and connect to it via SSH, except that this command line process has the properties of a smart contracts. Their commandline process on `ao` doesn't live in any specific data center or at any one physical location, and its computation is completely trustless. Every user can message and interact with every other process and program. The result of this is a global 'Single System Image': A unified computer -- spread around the world, operating at any scale -- shared between all users.

From the end-user or developer's perspective, the essence of `ao` is simple: `ao` is a shared computer that they can run any number of processes inside. These processes are not hosted on any specific servers, or under the control of any one individual or group. Instead, once launched these processes can be cryptographically entrusted to render their services in a provably neutral manner, permanently. This enables them to guarantee rights to their users over time.

When compared to existing decentralized and distributed computation systems, the `ao` protocol offers the following features:

- **Arbitrary numbers of processes ('contracts') running in parallel**: In `ao`, applications are built of any number of communicating processes. Inspired by [Erlang](https://erlang.org), `ao` does not allow processes to share memory between one another, but does allow them to coordinate via a native message-passing standard. Each of these processes can then be operated at the full speed of the computing resources that are available, without interfering with one another. By focusing on message-passing `ao` enables scaling mechanics that are far more similar to traditional web2/distributed systems environments, than traditional smart contracts.
- **Unbounded resource utilization in processes**: Building on the lazily-evaluated architecture of the original versions of [SmartWeave](https://github.com/ArweaveTeam/SmartWeave), nodes in the `ao` network do not need to perform any compute at all in order to reach consensus about program state transitions. State is implied 'holographically' by the Arweave-hosted log of messages to the process. Compute costs are then delegated to users who can either calculate their own states, or request execution by nodes of their choosing.
- **Access Arweave, a native unbounded harddrive**: `ao` processes are able to load data from Arweave directly into their memory for execution -- regardless of size -- as well as to write data back to the network. When paired with the network's lack of enforced resource limits and fully paralell execution, this capability significantly broadens the design space for programs, far beyond the normal constraints of traditional smart contract platforms. For example, machine learning tasks and high-compute autonomous agents.
- **Self-waking contracts**: In traditional smart contract environments (like Ethereum, Solana, Polygon, etc.), contracts 'wake up' to perform compute at the request of a user transaction. This creates an environment in which programs are not 'live' unless a user interacts with them, lessening the scope of applications that can be built ontop. `ao` removes this limitation by allowing contracts to have scheduled 'cron' interactions that automatically wake them up and execute compute at set intervals. Any user, or indeed the process itself, can pay a node to 'subscribe' to a process in order to trigger the evaluation of the compute at the appropriate frequency.
- **Modular architecture supporting extensions**: `ao`'s core architecture is an open data protocol that anyone can build an implementation of. Everything -- from the sequencers, message passing relayers, and even the virtual machine of the system -- can be swapped out and extended at will. This flexibility will allow the existing smart contracting systems in the Arweave ecosystem (Warp, Ever, Mem, et al) to plug into `ao` and be able to send and receive messages from the unified network. This will also allow all of these smart contracting systems to share some of the same infrastructure and tooling, making for a more coherent experience of compute on Arweave.

### The `ao` Architecture in a Nutshell

The fundamental components of `ao` are as follows:

- **Processes:** The network's unit of computation. Processes are represented by a log of interacting _messages_ stored on Arweave, as well as an initialization data item. Processes define their required computing environment (its VM, scheduler, memory requires, and necessary extensions) in their initialization. While processes are represented at the consensus level in this way, they also imply a state which can be calculated by _computing units_ that satisfy the requirements and choose to execute the process. As well as receiving messages from user wallets, processes are also forwarded messages from other processes via _messenger units_. The developers of processes are given free choice as to how to determine the trustworthiness of these messages (see below).
- **Messages:** Every interaction with a process in `ao` is represented by a message. At their core, messages are [ANS-104](https://specs.arweave.dev/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw) compliant data items. Users and processes (via their _outboxes_ and _messenger units_) can send messages to other processes on the network by way of _scheduler units_. Messages in `ao` have semantics between that of [UDP](https://www.ietf.org/rfc/rfc768.txt) and [TCP](https://datatracker.ietf.org/doc/html/rfc791) packets: Delivery is guaranteed to occur only once, but if the message is never forwarded by a messenger unit -- or the recipient never actually processes it -- then its delivery will not occur.
- **Scheduler Units (SUs):** Scheduler Units are responsible for the single assignment of atomically incrementing slot numberings to the messages that are sent to a process. After assignment, schedulers are required to ensure that data is uploaded to Arweave and thus made permanently available for others to access. Processes have free choice of their preferred sequencer, which can be implemented in a variety of ways: Decentralized, centralized, or even user-hosted.
- **Compute Units (CUs)**: Compute Units are nodes that users and _messenger units_ can use in order to calculate the state of processes in `ao`. While SUs are obligated to sequence the messages of processes they have accepted, no CU is required to calculate the state of a process. This creates a peer-to-peer market for computation, where CUs offer the service of resolving process state in competition with one another -- trading off price, the computation requirements of the process, and other parameters. Once computation of a state is completed, the CU will return to the caller a signed attested of the _output_ (logs, outboxes, and requests to spawn other processes) of the resolution of a specific message. CUs may also generate and publish signed state attestations that other nodes can load -- optionally for a [UDL](https://mirror.xyz/0x64eA438bd2784F2C52a9095Ec0F6158f847182d9/AjNBmiD4A4Sw-ouV9YtCO6RCq0uXXcGwVJMB5cdfbhE) specified fee.
- **Messenger Units (MUs)**: Messenger Units are nodes that relay messages around the `ao` network according to a process called _cranking_. In essence, when MUs crank a message around the system they send it to the approprate SU for a process, then coordinate with a CU in order to calculate the output of the interaction, and then repeat the process recursively for any resulting outbox messages. This process continues until there are no more messages to crank. Users and processes can also pay a MU to _subscribe_ to a process, cranking any messages that result from its timed _cron_ interactions. Processes can also optionally label a message as a _cast_ -- leading the MU to send the message to its SU, but not listen for a response. In this way, `ao` is able to provide a vibrant environment that gives users and processes maximal choice -- VM, payment method, scheduler type, messaging security, and more -- without requiring consensus on costly computation itself.

![ao-1](https://hackmd.io/_uploads/BkW-TwSdp.png)

### Trust Model

The core `ao` data protocol, as described above, provides a framework for secure computation but does not provide or enforce any forms of economic guarantees in itself. In order to fulfil this role, an `ao` staking contract and token are under development that is able to enforce the correct operation of SUs, MUs, and CUs in the network. This contract and its associated mechanisms are not discussed in this specification, as this document is focused purely on `ao`'s core data protocol.

### Reference Implementation

The publication of this specification accompanies the release of `ao.TN.1`. This first testnet release of the system includes fully-functional implementations of SUs, MUs, and CUs for the network. While all choices referenced in this specification are deliberately open to allow different implementations with a range of trade-offs, the initial implementations offers:

- A WASM-based virtual machine environment, supporting up to 4 GB of RAM.
- A Lua runtime environment (`ao-lib`) that compiles to WASM, designed to allow for the easy development of processes in `ao`.
- An operating system environment (`aos`) that lets users interact with and manipulate the system via a Lua command-line interface.
- A Proof-of-Authority (PoA) style message passing service.
- The ability to self-host schedulers, and an open PoA network that all can use.

Notably missing from this initial version of the testnet are:

- [P3](https://arweave.net/UoDCeYYmamvnc0mrElUxr5rMKUYRaujo9nmci206WjQ) payment channels for accessing services on SUs, MUs, and CUs.
- A staking process and token to provide economic security for the functionality of nodes in the `ao` network.

Implementations of both of these systems are in development.

### Related Work

There are no direct analogies to draw upon that describe what `ao` is and the experience of using it. There are, however, many adjacent projects and networks that can be used to contrast with `ao` in order to elucidate its properties. In this section we discuss each in turn.

#### Erlang

`ao` is largely inspired by the Erlang computing environment and its programming language. Erlang is a environment which offers extremely lightweight processes, handled by schedulers in the runtime, in order to enable efficient utilization of massively parallel systems (machines and networks with many physical threads). These capabilities give rise to a 'process-oriented' form of programming, in which the developer naturally splits their computation into many cooperating and parallel components in order to achieve their goal. While Erlang is not extremely well known amongst mainstream computing circles, it is used in a significant number of environments where high performance is a necessity: [Telephony switches](TODO), instant messenging services like [WhatsApp](TODO), etc.

The `ao` computer derives its process-oriented approach from Erlang directly. Erlang offers clue evidence that an environment in which distributed computation is achieved through processes that pass messages but do not share memory can be highly efficient. `ao` applies this approach to the domain of smart contracts, while also offering a single system image for an Erlang-like environment for the first time.

#### Ethereum

Ethereum is a decentralized computing network in which all users share and memory and a single thread of execution. Originally based on an idea of [adding Turing Complete computation to Bitcoin](TODO), Ethereum morphed into a project to build a ['world computer'](TODO). Upon launch, Ethereum was able to demonstrate the power of trustless computation of arbitrary code -- without the production of an independent blockchain network -- for the first time. While the network gained immense traction with users and developers, the core network's throughput has not improved since it launched in 2015(?).

Instead of attempting to scale the base network past the processing capacity of a single, small thread of execution, the Ethereum ecosystem has pivoted to attempting to host multiple 'rollups' -- associated networks that inherit some of the properties of Ethereum. At the time of writing, there are X rollups in the Ethereum ecosystem with more than $YY million of total value represented in their programs. Each of these Y rollups represents another single thread ('process' in `ao`) of computation that can be performed in parallel. By building from the ground-up to focus on paralell execution rather than shared memory, `ao` offers a completely novel architecture that supports an arbitrary number of indepedent processes, while maintaining the ability for programs to be decentralized and trustless.

### About this Specification

This protocol defines the `ao` computer system in terms of its message structures, types, as well as the API endpoints that services that makeup the ao network employ to communicate. This document is intended to give the reader all of the information that they need in order to build an `ao` compliant service implementation. This specification is currently published in draft form. Please provide feedback to the authors if it does not provide sufficient detail or suffers other imprecisions, such that improvements can be made in future publications.

### The `ao` Data Protocol

![ao-message-workflows](https://hackmd.io/_uploads/S1Y8FLXda.png)

### `ao` Messaging Structures

All `ao` message structures are based off of ANS-104 Data-Items

A data-item is a binary specification found in the [ANS-104 Bundled Data Specification](https://specs.arweave.dev/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw). The data-item is the base structure of Arweave Transactions. The `ao` Data-Protocol, uses this specification as a core primative for each `type` in the `ao` Data-Protocol.

**Format**

| Field               | Description                                    | Encoding | Length (in bytes)         | Optional |
| ------------------- | ---------------------------------------------- | -------- | ------------------------- | -------- |
| Signature type      | Type of key format used for the signature      | Binary   | 2                         | x        |
| Signature           | A signature produced by owner                  | Binary   | Depends on signature type | x        |
| Owner               | The public key of the owner                    | Binary   | 512                       | x        |
| Target              | An address that this DataItem is being sent to | Binary   | 32 (+ presence byte)      | ✔        |
| Anchor              | A value to prevent replay attacks              | Binary   | 32 (+ presence byte)      | ✔        |
| number of tags      | Number of tags                                 | Binary   | 8                         | x        |
| number of tag bytes | Number of bytes used for tags                  | Binary   | 8                         | x        |
| Tags                | An avro array of tag objects                   | Binary   | Variable                  | x        |
| Data                | The data contents                              | Binary   | Variable                  | x        |

All optional fields will have a leading byte which describes whether the field is present (`1` for present, `0` for _not_ present). Any other value for this byte makes the DataItem invalid.

A tag object is an Apache Avro encoded stream representing an object `{ name: string, value: string }`. Prefixing the tags objects with their bytes length means decoders may skip them if they wish.

In the DataItem structure, the `anchor` and `target` fields are not mandatory. The `anchor` serves as an arbitrary value, enabling bundling gateways to guard against replay attacks targeting them or their users. The `target` field is specifically utilized in `ao` Message `data-items` to denote the `ao` Process that the Message is aimed at.

The `tags` section is the designated area where the specifications for each Data-Protocol type are defined according to the `ao` Data-Protocol Standards.

> NOTE: All tags names follow the ANS-116 - [Arweave Tag Naming Standard](https://specs.arweave.dev/?tx=XV8-NMh5uhLQflkrUs_7mcgj33pOWqQno1wyVi__j6w)

### `ao` Types

`ao` has several message types that instruct the network how to operate, these message type structures are provided below:

#### Modules

The `Module` type in the `ao` system defines the process module, essentially representing the Web Assembly-compiled code that is executed upon the instantiation of a process.

| Tag Name        | Description                                                                                             | Requires | Tag Value                 |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------- | ------------------------- |
| Data-Protocol   | The name of the Data-Protocol for this `data-item`                                                      | 1-1      | ao                        |
| Variant         | The network version that this data-item is for                                                          | 1-1      | ao.TN.1                   |
| Type            | The `ao` data-item type                                                                                 | 1-1      | Module                    |
| Module-Format   | Specifies the WebAssembly compilation method for module compatibility across various host environments. | 1-1      | wasm32-unknown-emscripten |
| Input-Encoding  | Defines the message encoding format, like JSON, XML, for developer-guided data interpretation.          | 1-1      | JSON-V1                   |
| Output-Encoding | Specifies the encoding for outgoing messages, like JSON, XML, ensuring consistent data handling."       | 1-1      | JSON-V1                   |
| Memory-Limit    | Sets the module's maximum memory, in megabytes or gigabytes, for optimal performance.                   | 0-1      | 16-mb                     |
| Compute-Limit   | Caps the compute cycles for a module per evaluation, ensuring efficient, controlled execution           | 0-1      | 1000                      |
| Extension       | Specifies the WASM module use cases, helping the 'Compute Unit' filter and select compatible modules.   | 0-n      | ?                         |

#### Processes

The `Process` type in the `ao` system defines the process to be instantiated.

| Tag Name        | Description                                                                                                                                                                                                               | Requires | Tag Value |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| Data-Protocol   | The name of the Data-Protocol for this `data-item`                                                                                                                                                                        | 1-1      | ao        |
| Variant         | The network version that this data-item is for                                                                                                                                                                            | 1-1      | ao.TN.1   |
| Type            | The `ao` data-item type                                                                                                                                                                                                   | 1-1      | Process   |
| Module          | Links the process to ao module using the module's unique Transaction ID (TXID).                                                                                                                                           | 1-1      | {TXID}    |
| Scheduler       | Specifies the scheduler unit by Wallet Address or Name, and can be referenced by a recent `Scheduler-Location`.                                                                                                           | 1-1      | {ADDRESS} |
| Cron-Interval   | An interval at which a particular Cron Message is recevied by the process, in the format `X-Y`, where X is a scalar value, and Y is `milliseconds`, `seconds`, `minutes`, `hours`, `days`, `months`, `years`, or `blocks` | 0-n      | 1-second  |
| Cron-Tag-{Name} | defines tags for Cron Messages at set intervals, specifying relevant metadata.                                                                                                                                            | 0-1      |           |
| {Any-Tags}      | Custom Tags specific for the initial input of the Process                                                                                                                                                                 | 0-n      |           |

#### Messages

The `Message` type in the `ao` system defines the message to be evaluated by the `ao` process.

> NOTE: `target` in the ANS-104 `data-item` specification contains the `TXID` of the process that will evaluate the message.

| Tag Name      | Description                                                                                                | Requires | Tag Value       |
| ------------- | ---------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| Data-Protocol | The name of the Data-Protocol for this `data-item`                                                         | 1-1      | ao              |
| Variant       | The network version that this data-item is for                                                             | 1-1      | ao.TN.1         |
| Type          | The `ao` data-item type                                                                                    | 1-1      | Message         |
| Load          | When set, the message includes a `data-item` from Arweave as its `data` property.                          | 0-1      | {TXID}          |
| Read-Only     | Marks message as a message that is looking for a response only and not modifying the memory of the process | 0-1      | {True or False} |
| From-Process  | If message is sent from a `Process` this tag references the `Process` TXID.                                | 0-1      | {TXID}          |
| From-Module   | If message is sent from a `Process` this tag references the `Module` TXID of that `Process`                | 0-1      | {TXID}          |
| Cast          | Sets message handling: 'True' for do not crank, 'False' for normal cranking                                | 0-1      | {True or False} |
| {Any-Tags}    | Custom Tags specific to the input of the Message                                                           | 0-n      | {any}           |

#### Assignments

The `Assignment` type in the `ao` system defines the schedule of the message. The Scheduler Unit `su` may create this `data-item` as a Bundle or as a Reference to a message `data-item`.

| Tag Name      | Description                                                                                                            | Requires | Tag Value       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| Data-Protocol | The name of the Data-Protocol for this `data-item`                                                                     | 1-1      | ao              |
| Variant       | The network version that this data-item is for                                                                         | 1-1      | ao.TN.1         |
| Type          | The `ao` data-item type                                                                                                | 1-1      | Assignment      |
| Process       | References `Process` via TXID                                                                                          | 1-1      | {TXID}          |
| Epoch         | Scheduling event sequence, incrementing with each process-scheduler transition.                                        | 1-1      | {Number}        |
| Nonce         | Uniquely increments per process/message within an Epoch, ensuring sequence integrity.                                  | 1-1      | {Number}        |
| Hash-Chain    | Ensures data integrity by cryptographically linking messages. It's crucial for security.                               | 1-1      | {Hash}          |
| Timestamp     | Records the creation time with precise NTP synchronization.                                                            | 1-1      | {UnixTimestamp} |
| Message       | If the `Assignment` data-item is a reference to an `On-Chain` message, this tag would contain the TXID of that Message | 0-1      | {TXID}          |
| Block-Height  | Records the Arweave blockchain's current block count, offering precise temporal context.                               | 1-1      | {Number}        |

#### Scheduler-Location

The `Scheduler-Location` Data-Item in the "ao" Data-Protocol specifies the Scheduler's URL, determined by the Owner's Wallet Address, creating a secure and authenticated link between the Scheduler and its web endpoint for easy access to its services.

| Tag Name      | Description                                                                               | Requires | Tag Value          |
| ------------- | ----------------------------------------------------------------------------------------- | -------- | ------------------ |
| Data-Protocol | The name of the Data-Protocol for this `data-item`                                        | 1-1      | ao                 |
| Variant       | The network version that this data-item is for                                            | 1-1      | ao.TN.1            |
| Type          | The `ao` data-item type                                                                   | 1-1      | Scheduler-Location |
| Url           | Specifies a complete internet resource address, enabling accurate access to the resource. | 1-1      | {URL}              |
| Time-To-Live  | Sets a time limit for caching data URLs, ensuring up-to-date information.                 | 1-1      | {Milliseconds}     |

#### Scheduler-Transfer

The "Scheduler-Transfer" Data-Item Type in the "ao" Data-Protocol signals a change in schedulers, ensuring a seamless transition for scheduling operations within the system.

| Tag Name       | Description                                                                                                                                                                | Requires | Tag Value                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------ |
| Data-Protocol  | The name of the Data-Protocol for this `data-item`                                                                                                                         | 1-1      | ao                       |
| Variant        | The network version that this data-item is for                                                                                                                             | 1-1      | ao.TN.1                  |
| Type           | The `ao` data-item type                                                                                                                                                    | 1-1      | Scheduler-Transfer       |
| Scheduler      | Records details of the current active Scheduler, preventing confusion about which Scheduler is in control during transitions or scheduling changes within the "ao" system. | 1-1      | {WALLET_ADDRESS or NAME} |
| Next-Scheduler | Identifies the upcoming Scheduler for message ordering, ensuring a smooth transition in scheduling duties for system continuity and efficiency.                            | 1-1      | {TXID}                   |
| Length         | Associated with an epoch, counts the total messages created in that phase, aiding in workload tracking and system performance analysis.                                    | 1-1      | {Number}                 |
| Process        | References `Process` via TXID                                                                                                                                              | 1-1      | {TXID}                   |
| Hash-Chain     | Ensures data integrity by cryptographically linking messages. It's crucial for security.                                                                                   | 1-1      | {Hash}                   |
| Timestamp      | Records the creation time with precise NTP synchronization.                                                                                                                | 1-1      | {UnixTimestamp}          |
| Epoch          | Marks when a data-item was created, assigning it to a specific system phase or period for organized processing and analysis within a batch of related messages.            | 1-1      | {Number}                 |
| Nonce          | Indicates the last used unique number in a message series, ensuring message order, integrity, and security.                                                                | 1-1      | {Number}                 |

---

# `ao` Node Unit APIs

Units represent the distinct operational domains within the computer, capable of scaling from 0 to multiple instances, each assigned with unique duties within the network.

## Scheduler (SU)

The `ao` Scheduler Unit is tasked with the sequential arrangement and dissemination of `ao` messages to the Arweave network. Additionally, Compute Units are dependent on the Schedulers for obtaining the sequence of `ao` messages required for the assessment of updates.

### Endpoints

### **GET /**

**Description**

Scheduler Unit Service Information, the `Unit`, `Address`, `Timestamp`, `Processes`

##### **Responses**

## 200 - OK

##### Schema

```json
{
  "type": "object",
  "properties": {
    "Unit": {
      "type": "string",
      "enum": ["Scheduler"]
    },
    "Address": {
      "type": "string",
      "example": "Xy9PqW3vR5sT8uB1nM6dK0gF2hL4jC7iE9rV3wX5"
    },
    "Timestamp": {
      "type": "integer",
      "example": 1642016756
    },
    "Processes": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "example": [
        "A1b2C3d4E5f6G7h8I9j0K1L2M3N4O5P6Q7R8S9T0",
        "WxYz1234567890AbCdEfGhIjKlMnOpQrStUv"
      ]
    }
  }
}
```

##### Example

```JSON
{
  "Unit": "Scheduler",
  "Address": "Xy9PqW3vR5sT8uB1nM6dK0gF2hL4jC7iE9rV3wX5",
  "Timestamp": 1642016756,
  "Processes": [
    "A1b2C3d4E5f6G7h8I9j0K1L2M3N4O5P6Q7R8S9T0",
    "WxYz1234567890AbCdEfGhIjKlMnOpQrStUv",
    "4rV3wX5Xy9PqW3vR5sT8uB1nM6dK0gF2hL4jC7iE9",
    "2mNoP3qRsT4uVwX5yZaBcDeFgHiJkL"
  ]
}
```

---

### **POST /**

**Description**

Submits an `ao` DataItem to the Scheduler, the item can be a type of `Process` or `Message`.

**Request Body**

ANS-104 DataItem Binary Format [See Spec](https://specs.arweave.dev/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw)

##### **Responses**

## 201 - Created

##### Schema

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "example": "4rV3wX5Xy9PqW3vR5sT8uB1nM6dK0gF2hL4jC7iE9"
    },
    "timestamp": {
      "type": "integer",
      "example": 1642016756
    }
  }
}
```

##### Example

```JSON
{
  "id": "TXID of the Assignment DataItem",
  "timestamp": "milliseconds"
}
```

## 400 - Bad Request

##### Schema

```json
{
  "type": "object",
  "properties": {
    "error": {
      "type": "string"
    }
  }
}
```

##### Example

```JSON
{
  "error": "could not parse DataItem"
}
```

### **GET /{process-id}**

**Description**

This endpoint is usually requested by the `Compute Unit (cu)`, and the response is a JSON Array of messages for a given `Process`

**Url Param**

| Param      | Description        | Value  | Optional? |
| ---------- | ------------------ | ------ | --------- |
| process-id | the process {TXID} | {TXID} | :x:       |

**Query Params**

| Param | Description                                                        | Value           | Optional?          |
| ----- | ------------------------------------------------------------------ | --------------- | ------------------ |
| from  | the Timestamp to filter all messages after or equal to this value  | {UnixTimestamp} | :heavy_check_mark: |
| to    | the Timestamp to filter all messages before or equal to this value | {UnixTimestamp} | :heavy_check_mark: |

##### **Responses**

## 200 - OK

When receiving a 200 response, the body of the response contains a JSON document which contains 0 to many DataItems.

```json
{
  "type": "object",
  "properties": {
    "page_info": {
      "type": "object",
      "properties": {
        "has_next_page": {
          "type": "boolean"
        }
      }
    },
    "edges": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "node": {
            "type": "object",
            "properties": {
              "message": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "tags": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "value": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "signature": {
                    "type": "string"
                  }
                }
              },
              "block": {
                "type": "string"
              },
              "owner": {
                "type": "object",
                "properties": {
                  "address": {
                    "type": "string"
                  },
                  "key": {
                    "type": "string"
                  }
                }
              },
              "process_id": {
                "type": "string"
              },
              "data": {
                "type": "string"
              },
              "epoch": {
                "type": "integer"
              },
              "nonce": {
                "type": "integer"
              },
              "timestamp": {
                "type": "integer"
              },
              "hash_chain": {
                "type": "string"
              }
            }
          },
          "cursor": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

Example

```json
{
    "page_info" {
        "has_next_page":false
    },
    "edges":[
        {
            "node":{
                "message":{
                    "id":"cWT4kHuayCxgSCkh__GlG6drhzru10P4VSt7HmiGwLs",
                    "tags":[
                        {"name":"function","value":"raw"},
                        {"name":"Data-Protocol","value":"ao"},
                        {"name":"Variant","value":"ao.TN.1"},
                        {"name":"Type","value":"Message"},
                        {"name":"SDK","value":"ao"},
                        {"name":"Content-Type","value":"text/plain"}
                    ],
                    "signature":"AtZUmRQGLoChYZWUPdi_0idgXcnms_Ps52Sqtwb56dwP0m6k5SmYW19m0iyLZb_stHilkN48YHOXtgBS23BMd91KGqlE4ygDu1Pre2cok89pU5hOW5x3cXUslKHIgEyuhvtau-hnox2KAFezdm6-cTQNaLuUB-WG7nnoRj8zA2zYMgQyv-prOd74Sh3xFNymLJb-2QdF3V5rDrbw_QfeW5onUL-QqlB74l8XuMqzooIDLnXd_phkyupNeLOaU0fUMdU12-bRB0U5PeNHQJrROwO-8BUMZF1vMM5YDCbl_e4DvAnp5YKoSr3Q9lN_ukp_cS6PME16X4oNyGXxKGzFM0r5kDXnIAnyHERzI_xUCu2WOy1cXCgh9xleFjiNocrk78_j35ISKOqfiXdgeekUC7UJ-HOpfXjQUYpZIwPtDMQSSIYkqEB8ZHS1z2CGj7LAHsRkzsBUgc6fyiRRFUh-rsz19K7n9WiHeNSM-hLeZ0_jC7UrKLJEta07U9_CDckkpQPTRsoRtmB0O94C9C66NfQgNFiZ6tEDt1jYXB84_xfdWDZEZG852Hnh5LwzBHPJPrIUuKFUPJcK8JKr6wy-xzdaI4PUiipHQh2KEBKsTOk4RvzAy-wM9FidygzXGg4Cm1w1mkBQ1YYUwiWHSjbfHlN_Ki-oTR58wmbQ-ltxcf4"
                },
                "block":"000001325278",
                "owner":{
                    "address":"lCA-1KVTuBxbUgUyeT_50tzrt1RZkiEpY-FFDcxmvps",
                    "key":"szOvu74b_2VdNeY7LsTeOS98Ov1yA0wK3qrsU0ikZqIUWR9KZoLqrYqLUdvoNs4WQ-LZ0DeEgFEfvIqp_0K-Hfom17VTeI3TVpbVSYP8SRo1PN5_mHpaMweKIvEAyWC-tKqp_JcspGhdguKiNVuH3HySQnBuVMNfxiv_pTzUeF8kZWaMGz3sZb2IF4lFaaLcYJLj-d1xqXxZjVDTOL0Yt7YBeBKdEt2USzmt7iZMAk7E75kQx3eQ9eP9CfaQHSWksCfKxw1nU22kIFjLluQ8sn-7BLTJwhn4wDsfCklVZIOtyncvb8iSryvZPuYzWTNtB9m6uScwvGugxB_T8Zy1HP9cZY_WNs_bI7QeTaqJt2qFPAyBNMm9104Oe_Ad2B_a1ZGCSqTeCLAnsUwXemH6KU-b4B2fyp5FYmZc6MB5FfyIYFhdMs_c8IixoIS_KBYa4eootYrSbzfaXeDN57OS6JyqemMhR71r5Emv1STF7D8HrxQpqTJL-foRk6dYFsqcapa46J5eAVugxtM9RIT1aH-fs1o7P-Zb_LtbSWQXGKhuoriqIH6DW_OI76iS1TeEkaSAjiJuRuyLU-ttEcvnkF08v6EuHSvOjRZcFmZ0mET-n0XUrW5Ng6gJeSWOEbCx27up4stEULL_sZ1rA477niOmyYBgf0BiFiIGIz-ShEE"
                },
                "process_id":"eQRl2fpjEQEMh3dzlzhXskRBsDvRXomNTqgIgrcNKts",
                "data":"NTYyNQ",
                "epoch":0,
                "nonce":0,
                "timestamp":1702947653338,
                "hash_chain":"_-gzHSmv6WYguKmDi4FWcFSn-wGh9aqRYfEAeyE5OeQ"
            },
            "cursor":"1702947653338"
        }
    ]
}
```

---

### **GET /{message-id}?process-id={process-id}**

**Description**

This endpoint is usually requested by the `Compute Unit (cu)`, and the response is a single JSON message representing a single message in ao.

**Url Param**

| Param      | Description        | Value  | Optional? |
| ---------- | ------------------ | ------ | --------- |
| message-id | the message {TXID} | {TXID} | :x:       |

**Query Params**

| Param      | Description                                     | Value  | Optional? |
| ---------- | ----------------------------------------------- | ------ | --------- |
| process-id | the {TXID} of the process for this messag value | {TXID} | :x:       |

##### **Responses**

## 200 - OK

When receiving a 200 response, the body of the response contains a JSON document which contains 1 data-item.

##### Schema

```json
{
  "type": "object",
  "properties": {
    "message": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "tags": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "value": { "type": "string" }
            }
          }
        },
        "signature": { "type": "string" }
      }
    },
    "block": {
      "type": "string"
    },
    "owner": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "key": {
          "type": "string"
        }
      }
    },
    "process_id": {
      "type": "string"
    },
    "data": {
      "type": "string"
    },
    "epoch": {
      "type": "integer"
    },
    "nonce": {
      "type": "integer"
    },
    "timestamp": {
      "type": "integer"
    },
    "hash_chain": {
      "type": "string"
    }
  }
}
```

##### Example

```json
{
  "message": {
    "id": "ZLc9hjPCFK6bCWwu_VM4gv-7adZEHMlJIJ4zqXruP_E",
    "tags": [
      {
        "name": "function",
        "value": "ping"
      },
      {
        "name": "friend",
        "value": "Uv4aUd7E3PLjcC13Md29v5F-7iTmosJrsJVxQct-7ts"
      },
      {
        "name": "Data-Protocol",
        "value": "ao"
      },
      {
        "name": "Variant",
        "value": "ao.TN.1"
      },
      {
        "name": "Type",
        "value": "Message"
      },
      {
        "name": "SDK",
        "value": "ao"
      },
      {
        "name": "Content-Type",
        "value": "text/plain"
      }
    ],
    "signature": "aFNVuU0ymp7-Z9zrEC2alHYwWNk5gnOWQHCkFXLFyka8Vx1z9DiysbtArq9NYigGJrSeICEAseQeBSnGWR2IAOklQw_D60_rRPXLQhbW9e0-o7EZju79eCl9PjjWlpSMDkezN6SCui64VWxqQU3A9ciBuL4hrkpGNvYbXmDGaN64eO9rBahw_Sku836nd0WwmtbSSdCJSSTOiB91t_1VmzPE20hCvBPRBTUnhjHsMEmw7N7jAc0m7pnIvlDq90wic-C6QbydFgTZqIUL0_ga2qFJjgy0sZup_XFzdpQPlIMf41VaAfCOVcZN4_xaTPf7Qjxs30o22X2l1u74QNwILY742h7fqvCfodHYUlmYIZnvfl2-KsS1IQDY8SMyCYopd7TbPC-JOHDNKXyhGzXfgjF1nzbbuOqbOgzLQH3CBKAsjDImAnm0ApJpc856ymqb27htJ3bsJAmRo7NKac6uPrDXAdaXEeV_5OeoAxPVrxmBdZAav5Cq_o47JLk2gvPSQupv2SBvafkO89pPHHHL2XxHtmbfHhNTcgT7Zjd35WomULRYR1M0FiBkXSEETTFe8M3AFEmM8-IzpSqGhzJtiIboy22NqU-apUMhu-flzq3fn9dcCDlgZdkiKQ-P21yoIDs8ROZv4CbJv71OM07248G9kRH_ZVJkvQlUnHYDXOE"
  },
  "block": "000001327795",
  "owner": {
    "address": "4QKhXnyl1z3HEPprMKfTeXrWPRuQjK6O99k5SFKGuck",
    "key": "goGuTJ-Qzcnz1bUY2-twI0dI3OEXyg8i1ThCejv7HnZkg4CN90VxdNgtBhTtd-voYppEHJ6Y-uRuSsml0HxFBES3etBEM0ZFDSOds-frY9C6C-yz3wlmf0PhJw26xtuAoyKGPgyp9cTaa3sBv17DHl3TV34zB_cPqYbP8REEmAmjxvXX1tFd02-BQMkLnw0V3hyEQ5QXiZvKPalkH0_t_HbbIS9XvLoM3O4q-TTZhC3tPAvux3EfU9PrcJgnHS2VUYYO8mEYpRDA58NpccUyO65SVdr-SVMlPnARvvxoDKHfevDSf3Ck5qRMiTYqB6RskDNVYJPQF8uus6Eqzfnnr9377aYuZws442iwGNIuiS6-3KtM5ftu0pF_pmXmXfC3GwVo-A7ozdDL1RHjoC0rvpdIVB32RwN_9CPUXKuiclL96dAVZiflSb3uYOdhP1InAykMVL8VgFMqWw2GxXLXURbmQq6jqZNGV95slr0JC_43NtRqN3u6UBwzhU1Zi34ptuFVm1RRTGAO9cl2XBFJhHlTwnBLN7ex9q1vmZt2z4QBL61PuCvCu9NvjBHPbR70BG0GDqQL_HxC6MeYU5En3vOsWWee6c9uxaDBbPxt9P1EwXLnFQTUoMK2cmqn4zcWhbBBzixEQjIKXtDolOr-yU975fC30Lmiq6Ph79Kg65M"
  },
  "process_id": "xvOf_LbJFOBNxRWdIeXQiJjgnoFRsXYCPW0YZY-mqWI",
  "data": "MTQxMg",
  "epoch": 0,
  "nonce": 0,
  "timestamp": 1703272053604,
  "hash_chain": "aoGxvPlUsliUoZ4n4EkpaZnYL_vrVVs19l1ami_ZnQY"
}
```

### **GET /timestamp**

**Description**

Returns the current timestamp JSON document from the `su`

##### **Responses**

## 200 - OK

Format: JSON

| Property     | Description                                 |
| ------------ | ------------------------------------------- |
| block_height | The current height of the Arweave Network   |
| timestamp    | The current timestamp of the Scheduler Unit |

##### Schema

```json
{
  "type": "object",
  "properties": {
    "block_height": {
      "type": "string"
    },
    "timestamp": {
      "type": "string"
    }
  }
}
```

### GET /processes/{process-id}

**Description**

This endpoint is usually requested by the `Compute Unit (cu)` and the `Message Unit (mu)`, and the response is a single JSON object representing a single process in ao.

**Url Param**

| Param      | Description        | Value  | Optional? |
| ---------- | ------------------ | ------ | --------- |
| process-id | the process {TXID} | {TXID} | :x:       |

##### **Responses**

## 200 - OK

When receiving a 200 response, the body of the response contains a JSON document which contains 1 data-item.

##### Schema

```json
{
  "type": "object",
  "properties": {
    "process_id": { "type": "string" },
    "block": { "type": "string" },
    "owner": {
      "type": "object",
      "properties": {
        "address": { "type": "string" },
        "key": { "type": "string" }
      }
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "value": { "type": "string" }
        }
      }
    },
    "timestamp": { "type": "integer" }
  }
}
```

##### Example

```json
{
  "process_id": "xvOf_LbJFOBNxRWdIeXQiJjgnoFRsXYCPW0YZY-mqWI",
  "block": "000001327795",
  "owner": {
    "address": "4QKhXnyl1z3HEPprMKfTeXrWPRuQjK6O99k5SFKGuck",
    "key": "goGuTJ-Qzcnz1bUY2-twI0dI3OEXyg8i1ThCejv7HnZkg4CN90VxdNgtBhTtd-voYppEHJ6Y-uRuSsml0HxFBES3etBEM0ZFDSOds-frY9C6C-yz3wlmf0PhJw26xtuAoyKGPgyp9cTaa3sBv17DHl3TV34zB_cPqYbP8REEmAmjxvXX1tFd02-BQMkLnw0V3hyEQ5QXiZvKPalkH0_t_HbbIS9XvLoM3O4q-TTZhC3tPAvux3EfU9PrcJgnHS2VUYYO8mEYpRDA58NpccUyO65SVdr-SVMlPnARvvxoDKHfevDSf3Ck5qRMiTYqB6RskDNVYJPQF8uus6Eqzfnnr9377aYuZws442iwGNIuiS6-3KtM5ftu0pF_pmXmXfC3GwVo-A7ozdDL1RHjoC0rvpdIVB32RwN_9CPUXKuiclL96dAVZiflSb3uYOdhP1InAykMVL8VgFMqWw2GxXLXURbmQq6jqZNGV95slr0JC_43NtRqN3u6UBwzhU1Zi34ptuFVm1RRTGAO9cl2XBFJhHlTwnBLN7ex9q1vmZt2z4QBL61PuCvCu9NvjBHPbR70BG0GDqQL_HxC6MeYU5En3vOsWWee6c9uxaDBbPxt9P1EwXLnFQTUoMK2cmqn4zcWhbBBzixEQjIKXtDolOr-yU975fC30Lmiq6Ph79Kg65M"
  },
  "tags": [
    {
      "name": "Data-Protocol",
      "value": "ao"
    },
    {
      "name": "Variant",
      "value": "ao.TN.1"
    },
    {
      "name": "Type",
      "value": "Process"
    },
    {
      "name": "Module",
      "value": "6xSB_-rcVEc8znlSe3JZBYHRsFw5lcgjhLyR8b6leLA"
    },
    {
      "name": "Scheduler",
      "value": "4QKhXnyl1z3HEPprMKfTeXrWPRuQjK6O99k5SFKGuck"
    },
    {
      "name": "SDK",
      "value": "ao"
    },
    {
      "name": "Content-Type",
      "value": "text/plain"
    }
  ],
  "timestamp": 1703272008154
}
```

## Compute (CU)

The Compute Unit is tasked with the extraction, assessment, and regulation of the state of designated processes. Subsequent to the evaluation, it is accountable for conveying the outcomes of the specified message process back to the initiating Messenger Unit within the `ao` network.

Endpoints

### **GET /**

**Description**

The health check endpoint for the Compute Unit service provides the `Wallet` address under which the Compute Unit is managed.

##### **Responses**

## 200 - OK

| Property  | Description       |
| --------- | ----------------- |
| address   | wallet address    |
| timestamp | current timestamp |

##### Schema

```json
{
  "type": "object",
  "properties": {
    "address": { "type": "string" },
    "timestamp": { "type": "integer" }
  }
}
```

### **GET /result/{message-identifier}?process-id={process-identifier}**

**Description**

This `result` endpoint delivers the calculated outcome received as a result of evaluating the message identified by the message identifier.

The result may encompass `Output`, `Messages`, and/or `Spawns`. `Output` serves as a reply to the message. `Messages` represent outgoing Messages, each to be transmitted to their `Target` process, by an ao Messenger Unit. `Spawns` represent the initiation of new `ao` Processes.

**Resource Path Params**

| Param              | Description        | Value  | Optional? |
| ------------------ | ------------------ | ------ | --------- |
| message-identifier | the message {TXID} | {TXID} | :x:       |

**Query Params**

| Param      | Description        | Value  | Optional? |
| ---------- | ------------------ | ------ | --------- |
| process-id | the process {TXID} | {TXID} | :x:       |

**Request Body**

None

##### **Responses**

## 200 - OK

Format: JSON

| Property | Description                                                                               |
| -------- | ----------------------------------------------------------------------------------------- |
| Messages | An array of outbox messages as a result of evaluating the message                         |
| Spawns   | An array of outbox spawns as a result of evaluating the message                           |
| Output   | A string or object as a result of evaluating the message                                  |
| Error?   | A string or object that indicates an error occurred as a result of evaluating the message |

##### Schema

```json
{
  "type": "object",
  "properties": {
    "Output": {
      "type": "any"
    },
    "Messages": {
      "type": "array",
      "items": {
        "type": "object"
      }
    },
    "Spawns": {
      "type": "array",
      "items": {
        "type": "object"
      }
    },
    "Error": {
      "type": "string",
      "optional": true
    }
  }
}
```

#### Example:

```json
{
  "Messages": [
    {
      "Target": "mMmwJ_mpiLTgMvSB1kdcPyvpIz_J5vwHzpUbkkjoW3k",
      "Tags": [
        {
          "name": "Data-Protocol",
          "value": "ao"
        },
        {
          "name": "Type",
          "value": "Message"
        },
        {
          "name": "function",
          "value": "pong"
        },
        {
          "name": "friend",
          "value": "2gUxSxHT6JSxS0sI_QNHrkVVWckFa2sya0zyLcCenRM"
        }
      ]
    }
  ],
  "Spawns": [],
  "Output": {
    "friendlyMessage": "sending ping to mMmwJ_mpiLTgMvSB1kdcPyvpIz_J5vwHzpUbkkjoW3k"
  }
}
```

## **GET /cron/{process-identifier}?from={timestamp}&to={timestamp}**

**Description**

Just like Scheduled Messages sequenced via `ao` Schedulers, Cron Messages generated and evaluated by an `ao` Compute Unit (according to `Cron-Interval` tags on the `ao` Process) may also produce Outboxes ie. outgoing `Messages`, `Output`, and/or `Spawns`.

However, unlike the Outbox produced by a Scheduled Message, Outboxes produced by Cron Messages are not cycled to `ao` Scheduler Units by a Messenger Units regular cycling operation. Instead these "Cron Outboxes" must be cycled separately.

The `/cron` endpoint retrieves all "Cron Outboxes", within a timestamp range. This endpoint allows an `ao` Messenger Unit to retrieve these Outboxes and cycle them to the corresponding `ao` Scheduler Units.

**Resource Path Params**

| Param              | Description        | Value  | Optional? |
| ------------------ | ------------------ | ------ | --------- |
| process-identifier | the process {TXID} | {TXID} | :x:       |

**Query Params**

| Param | Description                              | Value  | Optional?          |
| ----- | ---------------------------------------- | ------ | ------------------ |
| from  | the left boundary timestamp (inclusive)  | {TXID} | :heavy_check_mark: |
| to    | the right boundary timestamp (exclusive) | {TXID} | :heavy_check_mark: |

**Request Body**

None

##### **Responses**

## 200 - OK - a [Connection](https://graphql.org/learn/pagination/#complete-connection-model) page of any outcomes received as a result of evaluating Cron Messages within the range of `from` and `to`

Format: JSON

##### Schema

```json
{
  "type": "object",
  "properties": {
    "hasNextPage": {
      "type": "boolean"
    },
    "edges": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "cursor": {"type": "string"}
          "node": {
            "type": "object",
            "properties": {
              "Output": {
                "type": "any"
              },
              "Messages": {
                "type": "array",
                "items": {
                  "type": "object",
                }
              },
              "Spawns": {
                "type": "array",
                "items": {
                  "type": "object"
                }
              },
              "Error": {
                "type": "string",
                "optional": true
              }
            }
          }
        }
      }
    }
  }
}
```

##### Example

```json
{
  "pageInfo" {
    "hasNextPage": false
  },
  "edges":[
    {
      "node": {
        "Messages": [
          {
            "Target": "mMmwJ_mpiLTgMvSB1kdcPyvpIz_J5vwHzpUbkkjoW3k",
            "Tags": [
              {
                  "name": "Data-Protocol",
                  "value": "ao"
              },
              {
                  "name": "Type",
                  "value": "Message"
              },
              {
                  "name": "function",
                  "value": "pong"
              },
              {
                  "name": "friend",
                  "value": "2gUxSxHT6JSxS0sI_QNHrkVVWckFa2sya0zyLcCenRM"
              }
            ]
          }
        ],
        "Spawns": [],
        "Output": {
          "friendlyMessage": "sending pong to mMmwJ_mpiLTgMvSB1kdcPyvpIz_J5vwHzpUbkkjoW3k"
        }
      },
      "cursor":"1702947653338"
    }
  ]
}
```

## GET /state/{process-identifier}

**Description**

This `state` endpoint delivers the process `Memory` as a result of evaluating the message identified by the message identifier.

This is the raw memory of the ao Process, as binary data.

**Resource Path Params**

| Param              | Description        | Value  | Optional? |
| ------------------ | ------------------ | ------ | --------- |
| process-identifier | the process {TXID} | {TXID} | :x:       |

**Query Params**

| Param | Description                                                | Value  | Optional?          |
| ----- | ---------------------------------------------------------- | ------ | ------------------ |
| to    | the timestamp of the message to evaluate up to (inclusive) | {TXID} | :heavy_check_mark: |

If `to` is not provided, the Compute Unit will evaluate the process up to the most recent Message.

> Any Cron Messages in the range will also be generated, and merged into the evaluation stream.

**Request Body**

None

##### **Responses**

## 200 - OK

Format: binary (`application/octet-stream`)

## Messenger (MU)

The Messenger Unit holds the responsibility for accepting incoming messages from clients, routing these messages to the designated Scheduler, and subsequently retrieving the outcome from the Compute Unit. Additionally, it handles the processing of any messages or spawn requests to conclude the operational cycle.

Endpoints

## GET /

**Description**

The root endpoint offers the ability to debug the messages being managed via this unit. You can enable the debugging via the `debug` param with a `process` identifier or a `message` identifier.

**Query Params**

| Param     | Description                                    | Value    | Optional?          |
| --------- | ---------------------------------------------- | -------- | ------------------ |
| debug     | this parameter flips on debug mode             | true     | :heavy_check_mark: |
| process   | the identifier of the process to debug         | {TXID}   | :heavy_check_mark: |
| message   | the identifer of the specific message to debug | {TXID}   | :heavy_check_mark: |
| page      | the page number                                | {Number} | :heavy_check_mark: |
| page-size | the amount of items per page                   | {Number} | :heavy_check_mark: |

##### **Responses**

## 200 - OK

Format: (text/plain)

Example: 'ao messenger unit'

## POST /

**Description**

When posting to the root endpoint, the request body should have a valid DataItem that is defined as an `ao` Data-Protocol. This DataItem is validated and routed to a `su` based on the `Scheduler` tag. This data-item should be either a Message or a Process

**Request Body**

| Field               | Description                                    | Encoding | Length (in bytes)         | Optional           |
| ------------------- | ---------------------------------------------- | -------- | ------------------------- | ------------------ |
| signature type      | Type of key format used for the signature      | Binary   | 2                         | :x:                |
| signature           | A signature produced by owner                  | Binary   | Depends on signature type | :x:                |
| owner               | The public key of the owner                    | Binary   | 512                       | :x:                |
| target              | An address that this DataItem is being sent to | Binary   | 32 (+ presence byte)      | :heavy_check_mark: |
| anchor              | A value to prevent replay attacks              | Binary   | 32 (+ presence byte)      | :heavy_check_mark: |
| number of tags      | Number of tags                                 | Binary   | 8                         | :x:                |
| number of tag bytes | Number of bytes used for tags                  | Binary   | 8                         | :x:                |
| tags                | An avro array of tag objects                   | Binary   | Variable                  | :x:                |
| data                | The data contents                              | Binary   | Variable                  | :x:                |

##### **Responses**

## 201 - Created

#### Schema

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" }
  }
}
```

#### Example

```JSON
{
  "id": "TXID of the Message or Process data-item"
}
```

## POST /monitor/{process-id}

**Description**

When posting to the this endpoint, the request body should have a valid DataItem that contains the process-id in the target field, that is the {TXID} of the Process DataItem. This same id should also be in the Url as shown above. The data field of this DataItem is not important here but the target and the signature are. After posting here, the MU will attempt to process scheduled messages on this processes on a timed basis with no further user interaction.

**Url Param**

| Param      | Description        | Value  | Optional? |
| ---------- | ------------------ | ------ | --------- |
| process-id | the process {TXID} | {TXID} | :x:       |

**Request Body**

| Field               | Description                                    | Encoding | Length (in bytes)         | Optional           |
| ------------------- | ---------------------------------------------- | -------- | ------------------------- | ------------------ |
| signature type      | Type of key format used for the signature      | Binary   | 2                         | :x:                |
| signature           | A signature produced by owner                  | Binary   | Depends on signature type | :x:                |
| owner               | The public key of the owner                    | Binary   | 512                       | :x:                |
| target              | An address that this DataItem is being sent to | Binary   | 32 (+ presence byte)      | :heavy_check_mark: |
| anchor              | A value to prevent replay attacks              | Binary   | 32 (+ presence byte)      | :heavy_check_mark: |
| number of tags      | Number of tags                                 | Binary   | 8                         | :x:                |
| number of tag bytes | Number of bytes used for tags                  | Binary   | 8                         | :x:                |
| tags                | An avro array of tag objects                   | Binary   | Variable                  | :x:                |
| data                | The data contents                              | Binary   | Variable                  | :x:                |

##### **Responses**

## 201 - Created

#### Schema

```json
{
  "type": "object",
  "properties": {
    "message": { "type": "string" }
  }
}
```

#### Example

```JSON
{
  "message": "A user friendly message from the MU"
}
```

## DELETE /monitor/{process-id}

**Description**

When calling this endpoint, the request body should have a valid DataItem that contains the process-id in the target field, that is the {TXID} of the Process DataItem. This same id should also be in the Url as shown above. The data field of this DataItem is not important here but the target and the signature are. After posting here, the MU will stop attempting to crank scheduled messages for the process.

**Url Param**

| Param      | Description        | Value  | Optional? |
| ---------- | ------------------ | ------ | --------- |
| process-id | the process {TXID} | {TXID} | :x:       |

**Request Body**

| Field               | Description                                    | Encoding | Length (in bytes)         | Optional           |
| ------------------- | ---------------------------------------------- | -------- | ------------------------- | ------------------ |
| signature type      | Type of key format used for the signature      | Binary   | 2                         | :x:                |
| signature           | A signature produced by owner                  | Binary   | Depends on signature type | :x:                |
| owner               | The public key of the owner                    | Binary   | 512                       | :x:                |
| target              | An address that this DataItem is being sent to | Binary   | 32 (+ presence byte)      | :heavy_check_mark: |
| anchor              | A value to prevent replay attacks              | Binary   | 32 (+ presence byte)      | :heavy_check_mark: |
| number of tags      | Number of tags                                 | Binary   | 8                         | :x:                |
| number of tag bytes | Number of bytes used for tags                  | Binary   | 8                         | :x:                |
| tags                | An avro array of tag objects                   | Binary   | Variable                  | :x:                |
| data                | The data contents                              | Binary   | Variable                  | :x:                |

##### **Responses**

## 200 - Ok

#### Schema

```json
{
  "type": "object",
  "properties": {
    "message": { "type": "string" }
  }
}
```

#### Example

```JSON
{
  "message": "A user friendly message from the MU"
}
```
