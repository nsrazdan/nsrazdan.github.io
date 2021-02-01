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
      animations: [],
      length: 150,
      maxVal: 100,
      minVal: 10,
      timeout: 5,
      arrayContainerHeight: 0.8,
      arrayContainerWidth: 0.8,
      inactiveColor: "blue",
      compareColor: "red",
      sortedColor: "purple"
    };
  }

  // setup when component first gets mounted
  componentDidMount() {
    // set maxVal to be percentage of screen height
    let screenHeight = window.screen.availHeight;
    this.setState((prevState) => ({
      maxVal: screenHeight * this.state.arrayContainerHeight
    }));

    // generate new array
    this.genArray();
  }

  render() {
    // vars to calculate render
    const arrayBars = [];
    const screenWidth = window.screen.availWidth;
    let arrayBarWidth = "2px";

    // calculate the width of bars
    arrayBarWidth = Math.floor((screenWidth * this.state.arrayContainerWidth) / this.state.length);

    // Create div for each value in array
    for (let i = 0; i < this.state.length; i++) {
      let style = {backgroundColor: this.state.inactiveColor, height: this.state.array[i] + 'px', width: arrayBarWidth};
      arrayBars.push(
        <div className="array-bar" key={i} style={style}> </div>);
    }

    return (
      <div className="page">
        <button onClick={() => this.genArray()}> Generate New Array </button>

        <button onClick={() => {
          this.bubbleSort();
          this.displayAnimations();
        }}> Bubble Sort </button>

        <button onClick={() => {
          this.heapSort();
          this.displayAnimations();
        }}> Heap Sort </button>

        <button onClick={() => {
          this.mergeSort();
          this.displayAnimations();
        }}> Merge Sort </button>

        <button onClick={() => {
          this.quickSort();
          this.displayAnimations();
        }}> Quick Sort </button>

        <button onClick={() => {
          this.selectionSort();
          this.displayAnimations();
        }}> Selection Sort </button>

        <div className="array-container"> {arrayBars} </div>
      </div>
    );
  }

  /* functions to create new random array of given length */
  genArray() {
    const tempArray = [];
    let arrayBars = document.getElementsByClassName("array-bar");

    // set array elements to new random numbers
    for(let i = 0; i < this.state.length; i++) {
      tempArray.push(this.getRandomInt(this.state.minVal, this.state.maxVal));
    }
    this.setState((prevState) => ({
      array: tempArray
    }));

    // set arrayBars colors to inactiveColor
    for (let i = 0; i < this.state.length; i++) {
      arrayBars[i].style.backgroundColor = this.state.inactiveColor;
    }
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
    console.log("Selection Sort Started with array:", this.state.array);

    let tempArray = this.state.array.slice();

    for (let i = 0; i < this.state.length; i++) {
      let min = {index: i, value: tempArray[i]};

      // find minimum element of unsorted sub-array
      for (let j = i; j < this.state.length; j++) {
        let cur = {index: j, value: tempArray[j]}

        // push animation of comparing min element with cur element
        this.state.animations.push({type: "compare", indices: [min.index, cur.index]});

        // if cur element is smaller than min, make new min element
        if (cur.value < min.value) {
          min.index = cur.index;
          min.value = cur.value;
        }
      }

      // push animation of swapping min element and sorted element
      this.state.animations.push({type: "swap", indices: [min.index, i]});
      this.state.animations.push({type: "sorted", indices: [i]});

      // swap minumum element of unsorted sub-array with first element of unsorted sub-array
      tempArray[min.index] = tempArray[i];
      tempArray[i] = min.value;
    }

    console.log("Sorted Array", tempArray);
  }

  /* Display animations */
  displayAnimations() {
    let anim = this.state.animations;
    let arrayBars = document.getElementsByClassName("array-bar");
    let prevAnim = {type: "undefined", indices: []};

    for (let t = 0; t < anim.length; t++) {
      // eslint-disable-next-line
      setTimeout(() => {
        // reset arrayBars of previous compare back to inactiveColor
        if (prevAnim.type === "compare") {
          for (let index of prevAnim.indices) {
            arrayBars[index].style.backgroundColor = this.state.inactiveColor;
          }
        }

        // animate depending on animation type
        switch(anim[t].type) {
          // color arrayBars of compare indices to compareColor
          case "compare":
            for (let index of anim[t].indices) {
              arrayBars[index].style.backgroundColor = this.state.compareColor;
            }
            prevAnim = anim[t];
            break;
          case "sorted":
            for (let index of anim[t].indices) {
              arrayBars[index].style.backgroundColor = this.state.sortedColor;
            }
            break;
          case "swap":
            this.swapStateArrayElements(anim[t].indices[0], anim[t].indices[1]);
            break;
          default:
            throw Error("Invalid animation type");
        }
      }, t * this.state.timeout);
    }

    // reset animations
    this.setState((prevState) =>({
      animations: []
    }));
  }

  swapStateArrayElements(idx1, idx2) {
    let tempArray = this.state.array.slice();
    let temp = tempArray[idx1];
    tempArray[idx1] = tempArray[idx2];
    tempArray[idx2] = temp;
    this.setState((prevState) => ({
      array: tempArray
    }));

  }
}
