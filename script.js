// script.js

// Node class for Linked List (both circular and doubly circular)
class Node {
    constructor(imageSrc) {
        this.imageSrc = imageSrc;
        this.next = null;
        this.prev = null;  // Used for doubly circular list
    }
}

// Circular Linked List Class (for continuous loop)
class CircularLinkedList {
    constructor() {
        this.head = null;
    }

    // Add a node at the end
    append(imageSrc) {
        const newNode = new Node(imageSrc);
        if (!this.head) {
            this.head = newNode;
            this.head.next = this.head;  // Points back to head for circularity
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }
    }

    // Traverse and display all nodes (for demonstration)
    display() {
        let current = this.head;
        const images = [];
        if (current) {
            do {
                images.push(current.imageSrc);
                current = current.next;
            } while (current !== this.head);
        }
        return images;
    }

    // Get next node (for continuous loop)
    getNext() {
        if (this.head) {
            this.head = this.head.next;
            return this.head;
        }
        return null;
    }
}

// Doubly Circular Linked List Class (for forward and backward navigation)
class DoublyCircularLinkedList {
    constructor() {
        this.head = null;
    }

    append(imageSrc) {
        const newNode = new Node(imageSrc);
        if (!this.head) {
            this.head = newNode;
            this.head.next = this.head;
            this.head.prev = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.prev = current;
            newNode.next = this.head;
            this.head.prev = newNode;
        }
    }

    getNext() {
        if (this.head) {
            this.head = this.head.next;
            return this.head;
        }
        return null;
    }

    getPrev() {
        if (this.head) {
            this.head = this.head.prev;
            return this.head;
        }
        return null;
    }
}

// Initialize the carousel
const carouselImages = [
    'images/7.jpg',
    'images/8-1.jpg',
    'images/9-1.jpg',
    'images/14.jpg'
];

const circularList = new CircularLinkedList();
const doublyCircularList = new DoublyCircularLinkedList();

// Add images to both lists
carouselImages.forEach(src => {
    circularList.append(src);
    doublyCircularList.append(src);
});

// Populate carousel with images
const carousel = document.getElementById('carousel');
function populateCarousel(images) {
    carousel.innerHTML = ''; // Clear existing images
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        carousel.appendChild(img);
    });
}

// Control next and previous buttons
function nextSlide() {
    const current = circularList.getNext();
    populateCarousel([current.imageSrc]);  // Show next image in the circular list
}

function prevSlide() {
    const current = doublyCircularList.getPrev();
    populateCarousel([current.imageSrc]);  // Show previous image in the doubly circular list
}

// Initial display
populateCarousel([circularList.head.imageSrc]);

