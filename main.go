package main

import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
)

func main() {
	var caseSensitive, invertMatch bool
	var searchKeyword string
	flag.StringVar(&searchKeyword, "k", "", "Search keyword")
	flag.BoolVar(&caseSensitive, "cs", false, "Case sensitive")
	flag.BoolVar(&invertMatch, "i", false, "Invert match")
	flag.Parse()

	if len(os.Args) < 2 {
		log.Fatalf("Usage: %s <search_keyword>", os.Args[0])
	}

	reader := bufio.NewReader(os.Stdin)

	lineNum := 1
	for line, err := reader.ReadString('\n'); err != io.EOF; line, err = reader.ReadString('\n') {
		if err != nil {
			log.Fatal(err)
		}

		if !caseSensitive {
			line = strings.ToLower(line)
			searchKeyword = strings.ToLower(searchKeyword)
		}

		line = strings.TrimSpace(line)

		var start int

		lineNumNotPrinted := true
		for {
			idx := strings.Index(line[start:], searchKeyword)
			if idx == -1 {
				if invertMatch {
					if lineNumNotPrinted {
						fmt.Printf("line: %d: ", lineNum)
						lineNumNotPrinted = false
					}
					fmt.Printf(line[start:])
				}
				break
			} else if invertMatch {
				break
			}
			if lineNumNotPrinted {
				fmt.Printf("line: %d: ", lineNum)
				lineNumNotPrinted = false
			}
			fmt.Printf(line[start : start+idx])
			fmt.Printf("\033[32m")
			fmt.Printf("\033[1m")
			fmt.Print(searchKeyword)
			fmt.Printf("\033[0m")
			start += idx + len(searchKeyword)
		}
		if start > 0 {
			fmt.Printf("\n")
		}
		lineNum++
	}
}
