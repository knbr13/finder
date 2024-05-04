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

int main(int argc, char **argv) {
    if (argc < 2) {
        printf("Usage: %s [-c] <search keyword>\n", argv[0]);
        return EXIT_FAILURE;
    }

    bool case_sensitive = false;
    char *search_keyword;

    if (argc > 2 && strcmp(argv[1], "-c") == 0) {
        case_sensitive = true;
        search_keyword = argv[2];
    } else {
        search_keyword = argv[1];
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

        size_t line_len = strlen(line_result.line);
        size_t search_value_len = strlen(search_keyword);

        if (search_value_len > line_len) {
            free(line_result.line);
            continue;
        }

        bool found = false;
        int offset = 0;
        for (size_t j = 0; line_result.line[j] != '\0';) {
            if (search_value_len > line_len - j) {
                break;
            }
            if (!CHAR_EQUAL(line_result.line[j], search_keyword[0], case_sensitive)) {
                j++;
                continue;
            };

            bool equal = true;
            for (size_t k = 0; k < search_value_len; k++) {
                if (!CHAR_EQUAL(line_result.line[j + k], search_keyword[k], case_sensitive)) {
                    equal = false;
                    j++;
                    break;
                }
            }
            if (equal) {
                if (!found) printf("%d:%zu: ", i, j + 1);
                found = true;
                for (; offset < j; offset++) {
                    putchar(line_result.line[offset]);
                }
                printf("\033[32m");
                printf("%s", search_keyword);
                printf("\033[0m");
                offset += strlen(search_keyword);
                j += strlen(search_keyword);
            }
        }
        if (offset != 0 && offset < line_len) {
            for (; offset < line_len; offset++) {
                putchar(line_result.line[offset]);
            }
        }
        if (found) putchar('\n');
        free(line_result.line);
    }

    return EXIT_SUCCESS;
}