#include "dynamic_array.h"

#include <stdlib.h>

DynamicArray *create_dynamic_array(size_t initial_capacity) {
    DynamicArray *arr = calloc(1, sizeof(DynamicArray));
    char *underlying_arr = calloc(initial_capacity, sizeof(char));

    arr->size = 0;
    arr->capacity = initial_capacity;
    arr->data = underlying_arr;

    return arr;
}

void destroy_dynamic_array(DynamicArray *arr) {
    free(arr->data);
    free(arr);
}

void dynamic_array_append(DynamicArray *arr, char value) {
    if (arr->capacity == arr->size) {
        arr->capacity *= 2;
        arr->data = realloc(arr->data, arr->capacity * sizeof(char));
    }
    arr->data[arr->size++] = value;
}
