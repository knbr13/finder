# Line Search Tool

The Line Search Tool is a command-line utility written in C that allows you to search for a keyword within lines of text input from the standard input (stdin). It provides options for case-sensitive and case-insensitive search modes.

## Usage

```bash
finder [-c] "key"
```

- `"key"`: The keyword to search for within the lines of text.
- `-c`: (Optional) Perform a case-sensitive search.


## Features

- Search for a keyword within lines of text from stdin.
- Option for case-sensitive or case-insensitive search.
- Print the line number, index, and the found keyword in green.

## Example

To search for the keyword "apple" in case-sensitive mode:

```bash
finder -c "apple"
```

To perform a case-insensitive (default behavior) search for "apple":
```bash
finder "apple"
```