#ifndef DYNAMIC_ARRAY_H
#define DYNAMIC_ARRAY_H

#include <stddef.h>

typedef struct {
    char *data;       // Pointer to the array data
    size_t size;      // Current size of the array
    size_t capacity;  // Total capacity of the array
} DynamicArray;

DynamicArray *create_dynamic_array(size_t initial_capacity);
void destroy_dynamic_array(DynamicArray *array);
void dynamic_array_resize(DynamicArray *array, size_t new_capacity);
void dynamic_array_append(DynamicArray *array, char value);
char dynamic_array_get_at(DynamicArray *array, size_t index);
void dynamic_array_set_at(DynamicArray *array, size_t index, char value);
char dynamic_array_pop(DynamicArray *array);
size_t dynamic_array_size(DynamicArray *array);
size_t dynamic_array_capacity(DynamicArray *array);

#endif