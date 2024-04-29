#include "dynamic_array.h"

#include <stdlib.h>

DynamicArray *create_dynamic_array(size_t initial_capacity) {
    DynamicArray *arr = calloc(1, sizeof(DynamicArray));
    char *underlying_arr = calloc(initial_capacity, sizeof(char));

    arr->size = initial_capacity;
    arr->capacity = initial_capacity;
    arr->data = underlying_arr;

    return arr;
}

void destroy_dynamic_array(DynamicArray *arr) {
    free(arr->data);
    free(arr);
}
