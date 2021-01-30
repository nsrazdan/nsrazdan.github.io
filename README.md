# Project Description
- Visualize how sorting algorithms work with colored vertical bars

## Color Meanings
- When a bar is blue, it is inactive. This means that bar is unsorted and is currently not being compared.
- When a bar is red, that means that it is being compared with the other red bar.
- When a bar is purple, that means that it is in its final sorted position.

# Code Hierarchy
- All of the code related to the calculation and display is in ./src/SortingVisualizer
- All of the front end is contained in the React component `SortingVisualizer`
- All of the sorting algorithms are implemented and member functions of `SortingVisualizer`
- The animations are implemented as a member function of `SortingVisualizer` that gets called once a sorting algorithm has completed

## Sorting Algorithms
- Each sorting algorithm is its own member function of `SortingVisualizer`
- A copy is made of the underlying state array `array` called `tempArray`
- During the sorting algorithm, all computation and editing is done on `tempArray`, not on `array`
- This is because `setState`, which would be needed to edit `array`, is asyncronous, and does not guarantee completion before the next line of code.
- You can read more about this here: https://ozmoroz.com/2018/11/why-my-setstate-doesnt-work/
- On every comparison, swap, or final sorted position, an object for animation gets pushed to the `animation` array
- For more information about how the animations work, look [here](#animations)

## Animations
- Animations are stored in an array in the state of `SortingVisualizer` called `animations`
- This array gets populated during a given sort with a sequence of objects
- These objects are in the form `{type: <type of animation>, indices: <indices of arrayBars that the animation applies to>}`
- The types are as follows:
  - "compare", with the indices of bars being compared
  - "swap", with the indices of bars to be swapped
  - "sorted", with the indices of bars that are in their final sorted position
- The animations get displayed after the sorting terminated, by using `SetTimeout()` to show the animations synchronously
- The state variable `array`, which contains the underlying array that gets sorted, is edited during the swap animation
- This is because the bars get their height directly from `array`
- This means that the timeout has to be long enough for `setState()` to be guaranteed to be completed before the next call. Otherwise, the state may not be changed before the next swap
