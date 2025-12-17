# JavaScript Design Patterns - Complete Teaching Guide

## Table of Contents

1. [Introduction to Design Patterns](#introduction)
2. [Creational Design Patterns](#creational-patterns)
   - [Singleton Pattern](#singleton)
   - [Factory Method Pattern](#factory-method)
   - [Abstract Factory Pattern](#abstract-factory)
   - [Builder Pattern](#builder)
   - [Prototype Pattern](#prototype)
3. [Structural Design Patterns](#structural-patterns)
   - [Adapter Pattern](#adapter)
   - [Decorator Pattern](#decorator)
   - [Facade Pattern](#facade)
   - [Proxy Pattern](#proxy)
4. [Behavioral Design Patterns](#behavioral-patterns)
   - [Chain of Responsibility Pattern](#chain-of-responsibility)
   - [Iterator Pattern](#iterator)
   - [Observer Pattern](#observer)
5. [Summary and Best Practices](#summary)

---

## Introduction to Design Patterns {#introduction}

### What Are Design Patterns?

Design patterns are **reusable solutions to common programming problems**. They are not specific code implementations but rather blueprints or templates that can be adapted to solve particular challenges in software development.

### Historical Context

- Popularized by the book **"Design Patterns: Elements of Reusable Object-Oriented Software"** (1994)
- Written by the "Gang of Four" (4 C++ engineers)
- Originally described **23 useful patterns** for object-oriented programming
- While created for C++/OOP, many patterns apply to modern JavaScript

### Key Points to Remember

✅ **Patterns are ideas, not rigid implementations**  
✅ **They help solve specific types of problems**  
✅ **Not all patterns are equally useful in JavaScript**  
✅ **Some patterns may add unnecessary complexity**  
✅ **Understanding when NOT to use a pattern is as important as knowing how to use it**

### Three Main Categories

1. **Creational Patterns** - How objects are created
2. **Structural Patterns** - How objects and classes are composed into larger structures
3. **Behavioral Patterns** - How objects communicate and assign responsibilities

---

## Creational Design Patterns {#creational-patterns}

> Creational patterns deal with object creation mechanisms

---

### 1. Singleton Pattern {#singleton}

#### Definition
Ensures that a class has **only one instance** and provides a global point of access to it. The instance is immutable and cannot be copied or modified.

#### When to Use
- Application configuration settings
- Database connections
- Logging services
- Cache managers
- Any scenario requiring a single source of truth

#### Implementation 1: Object Literal with Object.freeze()

```javascript
// Configuration object using Singleton pattern
const Config = {
  start: () => console.log('App has started'),
  update: () => console.log('App has updated'),
  apiUrl: 'https://api.example.com',
  maxRetries: 3
}

// Freeze prevents modification, addition, or deletion of properties
Object.freeze(Config)

// Usage
Config.start() // "App has started"
Config.update() // "App has updated"

// Attempt to modify (will fail silently in non-strict mode)
Config.name = "Robert"
console.log(Config) // name property won't be added
```

#### Implementation 2: Class-Based Singleton

```javascript
class Config {
  constructor() {
    this.apiUrl = 'https://api.example.com'
    this.maxRetries = 3
  }
  
  start() { 
    console.log('App has started') 
  }
  
  update() { 
    console.log('App has updated') 
  }
}

const instance = new Config()
Object.freeze(instance)

// Now instance is immutable
```

#### Pros & Cons

**Pros:**
- ✅ Single source of truth
- ✅ Global access point
- ✅ Lazy initialization possible
- ✅ Prevents accidental modifications

**Cons:**
- ❌ Can make testing difficult
- ❌ Violates Single Responsibility Principle
- ❌ Can introduce global state (often considered an anti-pattern)

---

### 2. Factory Method Pattern {#factory-method}

#### Definition
Provides an interface for creating objects, but allows customization of object properties after creation. Centralizes object creation logic.

#### When to Use
- When you need to create different types of objects with similar structure
- To centralize and organize object creation
- When object creation involves complex logic

#### Implementation 1: Class-Based Factory

```javascript
class Alien {
  constructor(name, phrase) {
    this.name = name
    this.phrase = phrase
    this.species = "alien"
  }
  
  fly() { 
    console.log("Zzzzzziiiiiinnnnnggggg!!") 
  }
  
  sayPhrase() { 
    console.log(this.phrase) 
  }
}

// Using the factory
const alien1 = new Alien("Ali", "I'm Ali the alien!")
console.log(alien1.name) // "Ali"
alien1.fly() // "Zzzzzziiiiiinnnnnggggg!!"
alien1.sayPhrase() // "I'm Ali the alien!"
```

#### Implementation 2: Function Factory

```javascript
function Alien(name, phrase) {
  this.name = name
  this.phrase = phrase
  this.species = "alien"
}

// Add methods to prototype for memory efficiency
Alien.prototype.fly = function() { 
  console.log("Zzzzzziiiiiinnnnnggggg!!") 
}

Alien.prototype.sayPhrase = function() { 
  console.log(this.phrase) 
}

const alien1 = new Alien("Ali", "I'm Ali the alien!")
console.log(alien1.name) // "Ali"
```

#### Real-World Example: User Factory

```javascript
class User {
  constructor(name, role, permissions) {
    this.name = name
    this.role = role
    this.permissions = permissions
    this.createdAt = new Date()
  }
  
  hasPermission(permission) {
    return this.permissions.includes(permission)
  }
}

// Factory function for creating different user types
function createUser(name, userType) {
  switch(userType) {
    case 'admin':
      return new User(name, 'admin', ['read', 'write', 'delete', 'manage'])
    case 'editor':
      return new User(name, 'editor', ['read', 'write'])
    case 'viewer':
      return new User(name, 'viewer', ['read'])
    default:
      return new User(name, 'guest', [])
  }
}

const admin = createUser('Alice', 'admin')
const editor = createUser('Bob', 'editor')
console.log(admin.hasPermission('delete')) // true
console.log(editor.hasPermission('delete')) // false
```

---

### 3. Abstract Factory Pattern {#abstract-factory}

#### Definition
Provides an interface for creating **families of related objects** without specifying their concrete classes. Adds an abstraction layer over the Factory Method.

#### When to Use
- When you need to create multiple related object types
- To ensure created objects are compatible with each other
- When you want a single interface to create different product families

#### Implementation: Vehicle Factory

```javascript
// Concrete factories for each vehicle type
class Car {
  constructor() {
    this.name = "Car"
    this.wheels = 4
  }
  turnOn() { 
    console.log("Chacabúm!!") 
  }
}

class Truck {
  constructor() {
    this.name = "Truck"
    this.wheels = 8
  }
  turnOn() { 
    console.log("RRRRRRRRUUUUUUUUUMMMMMMMMMM!!") 
  }
}

class Motorcycle {
  constructor() {
    this.name = "Motorcycle"
    this.wheels = 2
  }
  turnOn() { 
    console.log("sssssssssssssssssssssssssssssshhhhhhhhhhham!!") 
  }
}

// Abstract factory - single point of interaction
const vehicleFactory = {
  createVehicle: function(type) {
    switch (type) {
      case "car":
        return new Car()
      case "truck":
        return new Truck()
      case "motorcycle":
        return new Motorcycle()
      default:
        return null
    }
  }
}

// Usage
const car = vehicleFactory.createVehicle("car")
const truck = vehicleFactory.createVehicle("truck")
const motorcycle = vehicleFactory.createVehicle("motorcycle")

console.log(car) // Car { name: 'Car', wheels: 4 }
car.turnOn() // "Chacabúm!!"
```

#### Real-World Example: UI Component Factory

```javascript
// Different UI themes
class LightButton {
  render() { return '<button class="light">Click me</button>' }
}

class DarkButton {
  render() { return '<button class="dark">Click me</button>' }
}

class LightInput {
  render() { return '<input class="light" />' }
}

class DarkInput {
  render() { return '<input class="dark" />' }
}

// Abstract factory for UI components
const UIFactory = {
  createComponents: function(theme) {
    switch(theme) {
      case 'light':
        return {
          button: new LightButton(),
          input: new LightInput()
        }
      case 'dark':
        return {
          button: new DarkButton(),
          input: new DarkInput()
        }
      default:
        return null
    }
  }
}

// Usage
const lightTheme = UIFactory.createComponents('light')
const darkTheme = UIFactory.createComponents('dark')

console.log(lightTheme.button.render())
console.log(darkTheme.button.render())
```

---

### 4. Builder Pattern {#builder}

#### Definition
Constructs complex objects **step by step**. Allows you to add only the properties and methods needed, providing a more flexible approach than traditional factory patterns.

#### When to Use
- Creating objects with many optional parameters
- When object construction is complex and requires multiple steps
- To improve code readability when creating objects with many properties

#### Implementation: Object Composition

```javascript
// Base objects
const bug1 = {
  name: "Buggy McFly",
  phrase: "Your debugger doesn't work with me!"
}

const bug2 = {
  name: "Martiniano Buggland",
  phrase: "Can't touch this! Na na na na..."
}

// Builder functions add capabilities
const addFlyingAbility = obj => {
  obj.fly = () => console.log(`Now ${obj.name} can fly!`)
}

const addSpeechAbility = obj => {
  obj.saySmthg = () => console.log(`${obj.name} walks the walk and talks the talk!`)
}

// Apply only needed abilities
addFlyingAbility(bug1)
bug1.fly() // "Now Buggy McFly can fly!"

addSpeechAbility(bug2)
bug2.saySmthg() // "Martiniano Buggland walks the walk and talks the talk!"
```

#### Real-World Example: Query Builder

```javascript
class QueryBuilder {
  constructor() {
    this.query = {}
  }
  
  select(fields) {
    this.query.fields = fields
    return this // Method chaining
  }
  
  from(table) {
    this.query.table = table
    return this
  }
  
  where(conditions) {
    this.query.conditions = conditions
    return this
  }
  
  orderBy(field) {
    this.query.orderBy = field
    return this
  }
  
  limit(count) {
    this.query.limit = count
    return this
  }
  
  build() {
    let sql = `SELECT ${this.query.fields || '*'} FROM ${this.query.table}`
    if (this.query.conditions) sql += ` WHERE ${this.query.conditions}`
    if (this.query.orderBy) sql += ` ORDER BY ${this.query.orderBy}`
    if (this.query.limit) sql += ` LIMIT ${this.query.limit}`
    return sql
  }
}

// Usage with method chaining
const query = new QueryBuilder()
  .select('name, email')
  .from('users')
  .where('age > 18')
  .orderBy('name')
  .limit(10)
  .build()

console.log(query)
// "SELECT name, email FROM users WHERE age > 18 ORDER BY name LIMIT 10"
```

---

### 5. Prototype Pattern {#prototype}

#### Definition
Creates objects using another object as a **blueprint**, inheriting its properties and methods through prototypal inheritance.

#### When to Use
- When you need objects to share properties/methods
- To avoid the overhead of class instantiation
- For more flexible inheritance than class-based approaches

#### Implementation

```javascript
// Prototype object with shared methods
const enemy = {
  attack: () => console.log("Pim Pam Pum!"),
  flyAway: () => console.log("Flyyyy like an eagle!")
}

// Object that will inherit from prototype
const bug1 = {
  name: "Buggy McFly",
  phrase: "Your debugger doesn't work with me!"
}

// Set prototype relationship
Object.setPrototypeOf(bug1, enemy)

// Verify prototype
console.log(Object.getPrototypeOf(bug1))
// { attack: [Function], flyAway: [Function] }

// Use own properties and inherited methods
console.log(bug1.phrase) // "Your debugger doesn't work with me!"
bug1.attack() // "Pim Pam Pum!"
bug1.flyAway() // "Flyyyy like an eagle!"
```

#### Alternative: Object.create()

```javascript
const enemy = {
  attack() { console.log("Pim Pam Pum!") },
  flyAway() { console.log("Flyyyy like an eagle!") }
}

// Create object with enemy as prototype
const bug1 = Object.create(enemy)
bug1.name = "Buggy McFly"
bug1.phrase = "Your debugger doesn't work with me!"

bug1.attack() // "Pim Pam Pum!"
```

---

## Structural Design Patterns {#structural-patterns}

> Structural patterns deal with object composition and relationships between entities

---

### 6. Adapter Pattern {#adapter}

#### Definition
Allows objects with **incompatible interfaces** to work together. Acts as a bridge between two incompatible interfaces.

#### When to Use
- Integrating third-party libraries with different APIs
- Converting data formats (XML to JSON, etc.)
- Making legacy code work with modern systems

#### Implementation: Data Format Adapter

```javascript
// Array of cities with habitants in millions
const citiesHabitantsInMillions = [
  { city: "London", habitants: 8.9 },
  { city: "Rome", habitants: 2.8 },
  { city: "New York", habitants: 8.8 },
  { city: "Paris", habitants: 2.1 },
]

// New city with different format (raw number)
const BuenosAires = {
  city: "Buenos Aires",
  habitants: 3100000
}

// Adapter function to convert format
const toMillionsAdapter = city => {
  city.habitants = parseFloat((city.habitants / 1000000).toFixed(1))
}

// Convert and add the city
toMillionsAdapter(BuenosAires)
citiesHabitantsInMillions.push(BuenosAires)

// Function to find max habitants
const MostHabitantsInMillions = () => {
  return Math.max(...citiesHabitantsInMillions.map(city => city.habitants))
}

console.log(MostHabitantsInMillions()) // 8.9
```

#### Real-World Example: API Response Adapter

```javascript
// Old API returns data in one format
class OldAPI {
  getData() {
    return {
      full_name: "John Doe",
      email_address: "john@example.com",
      phone_number: "123-456-7890"
    }
  }
}

// New system expects different format
class NewSystemAdapter {
  constructor(oldAPI) {
    this.oldAPI = oldAPI
  }
  
  getUserData() {
    const oldData = this.oldAPI.getData()
    
    // Adapt to new format
    return {
      name: oldData.full_name,
      email: oldData.email_address,
      phone: oldData.phone_number
    }
  }
}

// Usage
const oldAPI = new OldAPI()
const adapter = new NewSystemAdapter(oldAPI)
const userData = adapter.getUserData()

console.log(userData)
// { name: "John Doe", email: "john@example.com", phone: "123-456-7890" }
```

---

### 7. Decorator Pattern {#decorator}

#### Definition
Attaches new behaviors to objects by placing them inside **wrapper objects** that contain the behaviors. Allows adding functionality dynamically.

#### When to Use
- Adding features to objects without modifying their structure
- Extending functionality in a flexible and reusable way
- When inheritance would create too many subclasses

#### React Example: Context Provider

```javascript
import { useState } from 'react'
import Context from './Context'

// Decorator that adds state management functionality
const ContextProvider = ({children}) => {
  const [darkModeOn, setDarkModeOn] = useState(true)
  const [englishLanguage, setEnglishLanguage] = useState(true)

  return (
    <Context.Provider value={{
      darkModeOn,
      setDarkModeOn,
      englishLanguage,
      setEnglishLanguage
    }}>
      {children}
    </Context.Provider>
  )
}

// Wrapping the app with the decorator
export default function App() {
  return (
    <ContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<AboutPage />}/>
          <Route path='/projects' element={<ProjectsPage />}/>
        </Routes>
      </Router>
    </ContextProvider>
  )
}

// Components can now access the decorated functionality
const AboutPage = () => {
  const { darkModeOn, englishLanguage } = useContext(Context)
  return (
    <div className={darkModeOn ? 'dark' : 'light'}>
      {/* Component content */}
    </div>
  )
}
```

#### Vanilla JavaScript Example

```javascript
// Base object
class Coffee {
  cost() { return 5 }
  description() { return "Simple coffee" }
}

// Decorators that add features
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee
  }
  
  cost() { 
    return this.coffee.cost() + 2 
  }
  
  description() { 
    return this.coffee.description() + ", milk" 
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee
  }
  
  cost() { 
    return this.coffee.cost() + 1 
  }
  
  description() { 
    return this.coffee.description() + ", sugar" 
  }
}

// Usage
let myCoffee = new Coffee()
console.log(myCoffee.cost()) // 5
console.log(myCoffee.description()) // "Simple coffee"

// Add decorators
myCoffee = new MilkDecorator(myCoffee)
myCoffee = new SugarDecorator(myCoffee)

console.log(myCoffee.cost()) // 8
console.log(myCoffee.description()) // "Simple coffee, milk, sugar"
```

---

### 8. Facade Pattern {#facade}

#### Definition
Provides a **simplified interface** to a complex system, library, or set of classes. Hides complexity behind a simple API.

#### When to Use
- Simplifying complex APIs or libraries
- Creating a unified interface to multiple subsystems
- Reducing dependencies on external code

#### Built-in JavaScript Examples

```javascript
// Array methods are facades over complex for loops
const numbers = [1, 2, 3, 4, 5]

// map is a facade
const doubled = numbers.map(n => n * 2)

// filter is a facade
const evens = numbers.filter(n => n % 2 === 0)

// reduce is a facade
const sum = numbers.reduce((acc, n) => acc + n, 0)
```

#### Custom Facade Example: Complex API Wrapper

```javascript
// Complex subsystems
class CPU {
  freeze() { console.log("CPU frozen") }
  jump(position) { console.log(`CPU jumping to ${position}`) }
  execute() { console.log("CPU executing") }
}

class Memory {
  load(position, data) { 
    console.log(`Loading ${data} into position ${position}`) 
  }
}

class HardDrive {
  read(lba, size) { 
    console.log(`Reading ${size} bytes from ${lba}`)
    return "boot data"
  }
}

// Facade that simplifies interaction
class ComputerFacade {
  constructor() {
    this.cpu = new CPU()
    this.memory = new Memory()
    this.hardDrive = new HardDrive()
  }
  
  start() {
    console.log("Starting computer...")
    this.cpu.freeze()
    const bootData = this.hardDrive.read(0, 1024)
    this.memory.load(0, bootData)
    this.cpu.jump(0)
    this.cpu.execute()
    console.log("Computer started!")
  }
}

// Usage - simple interface to complex system
const computer = new ComputerFacade()
computer.start()
// Instead of manually coordinating CPU, Memory, and HardDrive
```

---

### 9. Proxy Pattern {#proxy}

#### Definition
Provides a **substitute or placeholder** for another object to control access to it. Allows performing actions before or after requests reach the original object.

#### When to Use
- Controlling access to objects
- Adding logging, caching, or validation
- Lazy initialization
- Remote object representation

#### Express.js Middleware Example

```javascript
const jwt = require('jsonwebtoken')

// Proxy/Middleware function that controls access
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) {
    return res.status(401).send('No access token provided')
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Wrong token provided')
    }
    req.user = user
    next() // Allow access to the actual endpoint
  })
}

// Using the proxy in a route
router.get('/:jobRecordId', authenticateToken, async (req, res) => {
  try {
    const job = await JobRecord.findOne({_id: req.params.jobRecordId})
    res.status(200).send(job)
  } catch (err) {
    res.status(500).json(err)
  }
})
```

#### Virtual Proxy Example (Lazy Loading)

```javascript
class HeavyObject {
  constructor() {
    console.log("Creating heavy object...")
    // Expensive initialization
    this.data = new Array(1000000).fill("data")
  }
  
  process() {
    console.log("Processing heavy object...")
  }
}

// Proxy that delays creation until needed
class HeavyObjectProxy {
  constructor() {
    this.heavyObject = null
  }
  
  process() {
    // Lazy initialization
    if (this.heavyObject === null) {
      this.heavyObject = new HeavyObject()
    }
    this.heavyObject.process()
  }
}

// Usage
const proxy = new HeavyObjectProxy()
// Heavy object not created yet
console.log("Proxy created")

// Heavy object created only when needed
proxy.process()
```

---

## Behavioral Design Patterns {#behavioral-patterns}

> Behavioral patterns handle communication and responsibility assignment between objects

---

### 10. Chain of Responsibility Pattern {#chain-of-responsibility}

#### Definition
Passes requests along a **chain of handlers**. Each handler decides whether to process the request or pass it to the next handler.

#### When to Use
- Processing requests in a specific order
- Multiple objects might handle a request
- The set of handlers should be dynamic

#### Express Middleware Example

```javascript
// Each middleware is a handler in the chain
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next() // Pass to next handler
}

const authenticator = (req, res, next) => {
  if (req.headers.authorization) {
    next() // Pass to next handler
  } else {
    res.status(401).send('Unauthorized')
    // Chain stops here
  }
}

const validator = (req, res, next) => {
  if (req.body && Object.keys(req.body).length > 0) {
    next() // Pass to next handler
  } else {
    res.status(400).send('Invalid request body')
    // Chain stops here
  }
}

// Chain of responsibility
app.post('/api/data', 
  logger,        // Handler 1
  authenticator, // Handler 2
  validator,     // Handler 3
  (req, res) => {
    // Final handler
    res.send('Data processed successfully')
  }
)
```

#### Custom Implementation

```javascript
class Handler {
  setNext(handler) {
    this.nextHandler = handler
    return handler // Allows chaining
  }
  
  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }
    return null
  }
}

class NumberHandler extends Handler {
  handle(request) {
    if (typeof request === 'number') {
      console.log(`NumberHandler: Processing ${request}`)
      return true
    }
    return super.handle(request)
  }
}

class StringHandler extends Handler {
  handle(request) {
    if (typeof request === 'string') {
      console.log(`StringHandler: Processing "${request}"`)
      return true
    }
    return super.handle(request)
  }
}

class ArrayHandler extends Handler {
  handle(request) {
    if (Array.isArray(request)) {
      console.log(`ArrayHandler: Processing array of ${request.length} items`)
      return true
    }
    return super.handle(request)
  }
}

// Build the chain
const numberHandler = new NumberHandler()
const stringHandler = new StringHandler()
const arrayHandler = new ArrayHandler()

numberHandler.setNext(stringHandler).setNext(arrayHandler)

// Test the chain
numberHandler.handle(42)           // NumberHandler processes
numberHandler.handle("hello")      // StringHandler processes
numberHandler.handle([1, 2, 3])    // ArrayHandler processes
```

---

### 11. Iterator Pattern {#iterator}

#### Definition
Provides a way to **traverse elements of a collection** without exposing the underlying representation.

#### When to Use
- Iterating through complex data structures
- Providing multiple ways to traverse a collection
- Hiding implementation details of data structures

#### Built-in JavaScript Iterators

```javascript
// for...of uses iterator pattern
const array = [1, 2, 3, 4, 5]

for (const item of array) {
  console.log(item)
}

// forEach is an iterator
array.forEach(item => console.log(item))

// map returns new array (iterator)
const doubled = array.map(item => item * 2)

// filter returns filtered array (iterator)
const evens = array.filter(item => item % 2 === 0)

// reduce aggregates (iterator)
const sum = array.reduce((acc, item) => acc + item, 0)
```

#### Custom Iterator

```javascript
class Range {
  constructor(start, end, step = 1) {
    this.start = start
    this.end = end
    this.step = step
  }
  
  // Make the object iterable
  [Symbol.iterator]() {
    let current = this.start
    const end = this.end
    const step = this.step
    
    return {
      next() {
        if (current <= end) {
          const value = current
          current += step
          return { value, done: false }
        }
        return { done: true }
      }
    }
  }
}

// Usage
const range = new Range(1, 10, 2)

for (const num of range) {
  console.log(num) // 1, 3, 5, 7, 9
}

// Convert to array
const numbers = [...range]
console.log(numbers) // [1, 3, 5, 7, 9]
```

#### Tree Traversal Iterator

```javascript
class TreeNode {
  constructor(value) {
    this.value = value
    this.children = []
  }
  
  addChild(node) {
    this.children.push(node)
  }
  
  // Depth-first iterator
  *depthFirst() {
    yield this.value
    for (const child of this.children) {
      yield* child.depthFirst()
    }
  }
  
  // Breadth-first iterator
  *breadthFirst() {
    const queue = [this]
    while (queue.length > 0) {
      const node = queue.shift()
      yield node.value
      queue.push(...node.children)
    }
  }
}

// Build tree
const root = new TreeNode(1)
const child1 = new TreeNode(2)
const child2 = new TreeNode(3)
const grandchild = new TreeNode(4)

root.addChild(child1)
root.addChild(child2)
child1.addChild(grandchild)

// Iterate depth-first
console.log([...root.depthFirst()]) // [1, 2, 4, 3]

// Iterate breadth-first
console.log([...root.breadthFirst()]) // [1, 2, 3, 4]
```

---

### 12. Observer Pattern {#observer}

#### Definition
Defines a **subscription mechanism** to notify multiple objects about events happening to the object they're observing.

#### When to Use
- Event handling systems
- Implementing distributed event handling
- Model-View updates in MVC architecture
- Real-time data updates

#### React useEffect Example

```javascript
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  
  // Observer that reacts to userId changes
  useEffect(() => {
    console.log('userId changed, fetching new data')
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      
    // Cleanup function
    return () => {
      console.log('Cleaning up previous user data')
    }
  }, [userId]) // Observes userId
  
  // Runs on every render
  useEffect(() => {
    console.log('Component rendered')
  })
  
  return user ? <div>{user.name}</div> : <div>Loading...</div>
}
```

#### Custom Observer Implementation

```javascript
class Observable {
  constructor() {
    this.observers = []
  }
  
  subscribe(observer) {
    this.observers.push(observer)
    console.log(`Observer subscribed. Total: ${this.observers.length}`)
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
    console.log(`Observer unsubscribed. Total: ${this.observers.length}`)
  }
  
  notify(data) {
    console.log(`Notifying ${this.observers.length} observers`)
    this.observers.forEach(observer => observer(data))
  }
}

// Usage
const stockTicker = new Observable()

// Observer functions
const investor1 = (price) => {
  console.log(`Investor 1: Stock price is now $${price}`)
}

const investor2 = (price) => {
  console.log(`Investor 2: Stock price is now $${price}`)
  if (price > 150) {
    console.log('Investor 2: Selling!')
  }
}

// Subscribe
stockTicker.subscribe(investor1)
stockTicker.subscribe(investor2)

// Notify observers
stockTicker.notify(145) // Both notified
stockTicker.notify(155) // Both notified, investor2 sells

// Unsubscribe
stockTicker.unsubscribe(investor1)
stockTicker.notify(160) // Only investor2 notified
```

#### Event Emitter Pattern

```javascript
class EventEmitter {
  constructor() {
    this.events = {}
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }
  
  off(event, listenerToRemove) {
    if (!this.events[event]) return
    
    this.events[event] = this.events[event].filter(
      listener => listener !== listenerToRemove
    )
  }
  
  emit(event, ...args) {
    if (!this.events[event]) return
    
    this.events[event].forEach(listener => {
      listener(...args)
    })
  }
  
  once(event, listener) {
    const onceListener = (...args) => {
      listener(...args)
      this.off(event, onceListener)
    }
    this.on(event, onceListener)
  }
}

// Usage
const emitter = new EventEmitter()

// Subscribe to events
emitter.on('userLogin', (username) => {
  console.log(`${username} logged in`)
})

emitter.on('userLogin', (username) => {
  console.log(`Welcome ${username}!`)
})

// One-time listener
emitter.once('firstVisit', () => {
  console.log('Thanks for visiting!')
})

// Emit events
emitter.emit('userLogin', 'Alice')
// Output:
// Alice logged in
// Welcome Alice!

emitter.emit('firstVisit')
// Output: Thanks for visiting!

emitter.emit('firstVisit') 
// No output (once listener removed)
```

---

## Summary and Best Practices {#summary}

### Key Takeaways

#### Creational Patterns
- **Singleton**: One instance, global access
- **Factory Method**: Centralized object creation
- **Abstract Factory**: Create families of related objects
- **Builder**: Build complex objects step by step
- **Prototype**: Clone objects from blueprints

#### Structural Patterns
- **Adapter**: Make incompatible interfaces work together
- **Decorator**: Add behavior to objects dynamically
- **Facade**: Simplify complex systems
- **Proxy**: Control access to objects

#### Behavioral Patterns
- **Chain of Responsibility**: Pass requests through handler chain
- **Iterator**: Traverse collections
- **Observer**: Subscribe to and notify about events

### When to Use Design Patterns

✅ **DO use patterns when:**
- You have a clear, recurring problem
- The pattern simplifies your code
- It improves maintainability
- Your team understands the pattern
- The benefit outweighs the complexity

❌ **DON'T use patterns when:**
- You're forcing a pattern where it doesn't fit
- It adds unnecessary complexity
- A simpler solution exists
- You're "pattern-happy" (using patterns for the sake of it)

### Best Practices

1. **Understand the Problem First**
   - Don't start with a pattern
   - Identify the actual problem
   - Then see if a pattern fits

2. **Keep It Simple**
   - Simpler code is often better than "pattern-perfect" code
   - Don't over-engineer

3. **Know Your Language**
   - Some patterns are built into JavaScript
   - Modern JS features may replace certain patterns

4. **Team Communication**
   - Ensure your team knows the patterns you use
   - Document why you chose a specific pattern

5. **Refactor Toward Patterns**
   - Often better to refactor into a pattern
   - Rather than starting with one

### Modern JavaScript Considerations

Many design patterns are less relevant in modern JavaScript due to:

- **Modules**: Built-in encapsulation
- **Async/Await**: Simplified asynchronous code
- **Functional Programming**: Alternative approaches
- **React/Vue/Angular**: Built-in patterns for common problems

### Further Learning Resources

- 📚 "Design Patterns: Elements of Reusable Object-Oriented Software" (Gang of Four)
- 🌐 [Refactoring Guru](https://refactoring.guru/) - Detailed pattern explanations
- 🎥 [Fireship - Design Patterns](https://www.youtube.com/watch?v=tv-_1er1mWI)
- 📖 "Learning JavaScript Design Patterns" by Addy Osmani

### Practice Exercises

1. **Identify Patterns**: Look at your existing code and identify which patterns you're already using
2. **Refactor**: Take a complex piece of code and refactor it using appropriate patterns
3. **Compare**: Implement the same feature with and without patterns to see the difference
4. **Build**: Create a small project specifically to practice implementing different patterns

---

## Conclusion

Design patterns are powerful tools, but they're not magic solutions. The key is understanding:

- **What** each pattern does
- **When** to use it
- **Why** it might be beneficial
- **How** to implement it in JavaScript

Remember: **The best code is code that solves your problem clearly and maintainably.** If a pattern helps with that, great! If not, don't force it.

Happy coding! 🚀

