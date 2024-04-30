#include "dynamic_array.h"

#include <stdlib.h>

DynamicArray *create_dynamic_array(size_t initial_capacity) {
    if (initial_capacity < 1) {
        return NULL;
    }
    DynamicArray *arr = calloc(1, sizeof(DynamicArray));
    if (arr == NULL) {
        return NULL;
    }
    char *underlying_arr = calloc(initial_capacity, sizeof(char));
    if (underlying_arr == NULL) {
        free(arr);
        return NULL;
    }

    arr->size = 0;
    arr->capacity = initial_capacity;
    arr->data = underlying_arr;

    return arr;
}

void destroy_dynamic_array(DynamicArray *arr) {
    if (arr != NULL) {
        free(arr->data);
        free(arr);
    }
}

void dynamic_array_resize(DynamicArray *array, size_t new_capacity) {
    array->data = realloc(array->data, new_capacity * sizeof(char));
    array->capacity = new_capacity;
    if (new_capacity > array->size) {
        array->size = new_capacity;
    }
}

void dynamic_array_append(DynamicArray *arr, char value) {
    if (arr->capacity == arr->size) {
        arr->capacity *= 2;
        arr->data = realloc(arr->data, arr->capacity * sizeof(char));
    }
    arr->data[arr->size++] = value;
}

void dynamic_array_set_at(DynamicArray *array, char index, char value) {
    if (index < 0 || index >= array->size) {
        return;
    }
    array->data[index] = value;
}

char dynamic_array_pop(DynamicArray *arr) {
    if (arr->size == 0) {
        return -1;
    }
    arr->size--;
    char tmp = arr->data[arr->size];
    if (arr->size <= (arr->capacity / 2)) {
        arr->capacity /= 2;
        if (arr->capacity == 0) {
            arr->capacity = 1;  // Set a minimum capacity of 1
        }
        arr->data = realloc(arr->data, arr->capacity * sizeof(char));
    }
    return tmp;
}
