package main

import "unicode"

func cmp(a, b rune, caseSensitive bool) bool {
	if caseSensitive {
		return a == b
	}
	return a == b || a == unicode.ToUpper(b) || a == unicode.ToLower(b)
}
