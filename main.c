#include <stdio.h>

#include "dynamic_array.h"

unsigned int read_line(FILE *stream, DynamicArray *arr) {
    char c = getc(stream);
    if (c == 'q') {
        return 0;
    }

    unsigned int count = 0;

    for (; c != '\n' && c != EOF; c = getc(stream), count++) {
        dynamic_array_append(arr, c);
    }

    return count;
}

int main() {
    printf("Super Calculator: \n");

    for (;;) {
        printf("> ");
        DynamicArray *arr = create_dynamic_array(24);
        unsigned int r = read_line(stdin, arr);
        if (r == 0) {
            break;
        }
        for (int i = 0; i < arr->size; i++) {
            printf("%c", dynamic_array_get_at(arr, i));
        }
        printf("\n");
    }

    return 0;
}