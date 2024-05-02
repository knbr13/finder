#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CHAR_EQUAL(a, b, sensitive) \
    ((sensitive) ? ((a) == (b)) : (tolower(a) == tolower(b)))

typedef struct {
    char *line;
    int END_OF_FILE;
} LineResult;

LineResult readline(FILE *stream) {
    int offset = 0, buf_size = 4, c;

    char *buf = malloc(buf_size * sizeof(char));
    if (buf == NULL) {
        return (LineResult){.line = NULL, .END_OF_FILE = 0};
    }

    while ((c = getc(stream)) != '\n') {
        if (c == EOF) {
            free(buf);
            return (LineResult){.line = NULL, .END_OF_FILE = 1};
        }
        if (offset == buf_size - 1) {
            char *new_buf = realloc(buf, (buf_size *= 2));
            if (new_buf == NULL) {
                free(buf);
                return (LineResult){.line = NULL, .END_OF_FILE = 0};
            }
            buf = new_buf;
        }
        buf[offset++] = c;
    }

    if (offset < buf_size - 1) {
        char *new_buf = realloc(buf, offset + 1);
        if (new_buf == NULL) {
            return (LineResult){.line = NULL, .END_OF_FILE = 0};
        }
        buf = new_buf;
    }

    buf[offset] = '\0';
    return (LineResult){.line = buf, .END_OF_FILE = 0};
}

int isUpper(char c) {
    return c >= 'A' && c <= 'Z';
}

int isLower(char c) {
    return c >= 'a' && c <= 'z';
}

int search(char *line, char *search_value, bool case_sensitive) {
    size_t line_len = strlen(line);
    size_t search_value_len = strlen(search_value);

    if (search_value_len > line_len) {
        return -1;
    }

    for (size_t i = 0; line[i] != '\0'; i++) {
        if (search_value_len > line_len - i) {
            return -1;
        }
        if (!CHAR_EQUAL(line[i], search_value[0], case_sensitive)) continue;

        bool equal = true;
        for (size_t j = 0; j < search_value_len; j++) {
            if (!CHAR_EQUAL(line[i + j], search_value[j], case_sensitive)) {
                equal = false;
                break;
            }
        }
        if (equal) {
            return i;
        }
    }
    return -1;
}

void print_colored_string(char *line, int start, int end) {
    for (int i = 0; line[i] != '\0'; i++) {
        if (i == start) {
            printf("\033[31m");
        }
        if (i == end) {
            printf("\033[0m");  // reset the color
        }
        putchar(line[i]);
    }
}

int main(int argc, char **argv) {
    if (argc < 2) {
        printf("Usage: %s <search keyword>\n", argv[0]);
        return EXIT_FAILURE;
    }
    for (int i = 1;; i++) {
        LineResult line_result = readline(stdin);
        if (line_result.END_OF_FILE) {
            free(line_result.line);
            return EXIT_SUCCESS;
        }
        if (line_result.line == NULL) {
            return EXIT_FAILURE;
        }
        int index = search(line_result.line, argv[1], true);
        if (index >= 0) {
            printf("%d:%d: ", i, index);
            print_colored_string(line_result.line, index, index + strlen(argv[1]));
            putchar('\n');
        }
        free(line_result.line);
    }

    return EXIT_SUCCESS;
}