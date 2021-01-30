import React from "react";
import "./SortingVisualizer.css";

/* Animations work in the following way:
 * When an event that warrants an animation occurs, relevant data is pushed
 * to the state variable "animations"
 * The events are pushed during the sorting algorithm
 * Each element of animations is an object of the format:
 * {type: <type of animation>, indices: <indices of affected elements>}
 * The animation types are as follows:
 * "compare", turn compare color until next animation
 * "sorted", turn sorted color until reset of array
 * "swap", switch the heights of elements with indices
 */

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      length: 5,
      maxVal: 100,
      minVal: 10,
      animations: []
    };
  }

  render() {
    // vars to calculate render
    const arrayDisplay = [];

    // Create div for each value in array
    for (let i = 0; i < this.state.length; i++) {
      let style = {backgroundColor: 'lightblue', height: this.state.array[i] + 'px'}
      arrayDisplay.push(
        <div className="array-bar" key={i} style={style}> </div>);
    }

    return (
      <div className="page">
        <button onClick={() => this.resetArray()}> Generate New Array </button>
        <button onClick={() => this.bubbleSort()}> Bubble Sort </button>
        <button onClick={() => this.heapSort()}> Heap Sort </button>
        <button onClick={() => this.mergeSort()}> Merge Sort </button>
        <button onClick={() => this.quickSort()}> Quick Sort </button>
        <button onClick={() => this.selectionSort()}> Selection Sort </button>
        <div className="array-container"> {arrayDisplay} </div>
      </div>
    );
  }

  componentDidMount() {
    this.resetArray();
  }

  /* functions to create new random array of given length */
  resetArray() {
    const tempArray = [];
    for(let i = 0; i < this.state.length; i++) {
      tempArray.push(this.getRandomInt(this.state.minVal, this.state.maxVal));
    }
    this.setState((prevState) => ({
      array: tempArray
    }));
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /* Sorting algorithms */
  bubbleSort() {
    console.log("Bubble Sort Started");
  }

  heapSort() {
    console.log("Heap Sort Started");
  }

  mergeSort() {
    console.log("Merge Sort Started");
  }

  quickSort() {
    console.log("Quick Sort Started");
  }

  selectionSort() {
    console.log("Selection Sort Started");
    console.log(this.state.array);

    for (let i = 0; i < this.state.length; i++) {
      let min = {index: i, val: this.state.array[i]};

      // find minimum element of unsorted sub-array
      for (let j = i; j < this.state.length; j++) {
        let cur = {index: j, val: this.state.array[j]}

        // push animation of comparing min element with cur element
        this.state.animations.push({type: "compare", indices: [min.index, cur.index]});

        if (cur.val < min.val) {
          min.index = cur.index;
          min.value = cur.val;
        }
      }

      // push animation of swapping min element and sorted element
      this.state.animations.push({type: "swap", indices: [min.index, i]});
      this.state.animations.push({type: "sorted", indices: [i]});

      // swap minumum element of unsorted sub-array with first element of unsorted sub-array
      let tempArray = this.state.array.slice();
      tempArray[min.index] = tempArray[i];
      tempArray[i] = min.val;
      this.setState((prevState) => ({
        array: tempArray
      }));

      console.log("temp:", tempArray);
      console.log("state:", this.state.array);
    }

    console.log(this.state.animations);
  }

  /* Display animation */
  displayAnimations() {

  }
}
