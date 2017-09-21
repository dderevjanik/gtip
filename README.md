# gtip

CLI for [git-tips](https://github.com/git-tips/tips)

## Installation

```
git clone https://github.com/dderevjanik/gtip
cd gtip
npm i -g
```

## Usage

Go to any **git** project and type to terminal `gtip`.

### Search for Command

Search for any git tip. You can also use autocompletion with `tab` and thanks to fuzzysearch, you can specific only first letters of words.

```
gtip$ search [options] [query]
```

### Run Command

Will run git-tips command in interactive mode.

```
gtip$ run [command]
```

### List all available Commands

```
gtip$ list [options]
```

**Options:**

```
-c Show only commands
```

### Update git-tips

Use this command to update your git-tips database.

```
gtip$ update
```
