#ifndef DYNAMIC_ARRAY_H
#define DYNAMIC_ARRAY_H

typedef struct {
    char *data;     // Pointer to the array data
    char size;      // Current size of the array
    char capacity;  // Total capacity of the array
} DynamicArray;

DynamicArray *create_dynamic_array(char initial_capacity);
void destroy_dynamic_array(DynamicArray *array);
void dynamic_array_append(DynamicArray *array, char value);
void dynamic_array_insert(DynamicArray *array, char index, char value);
void dynamic_array_remove(DynamicArray *array, char index);
void dynamic_array_print(DynamicArray *array);
unsigned int dynamic_array_size(DynamicArray *array);
unsigned int dynamic_array_capacity(DynamicArray *array);

#endif