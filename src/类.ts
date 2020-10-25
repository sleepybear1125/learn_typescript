//1.定义一个简单的类
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

// 上面的例子中声明了一个 Greeter 类,这个类具有三个成员: 一个 greeting 的属性, 一个 构造函数 和 一个 greet() 方法
// 我们在引用任何一个类成员的时候都用了 this 它表示我们访问的是类的成员.
// 我们使用 new 构造了 Greeter 类的一个实例.它会调用之前定义的构造函数,创建一个 Greeter 类型的新对象,并执行构造函数初始化它.

//2.类的继承

// 2.1简单的继承
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

//类从基类中继承了属性和方法。 
//这里, Dog 是一个 派生类, 它派生自 Animal 基类, 通过 extends 关键字. 派生类通常被称作 子类, 基类通常被称作 超类.
//因为 Dog 继承了 Animal的功能, 因此我们可以创建一个 Dog 的实例, 它能够使用 bark() 和 move() 方法

// 2.2 使用super 和 重写父类方法
class Animal2 {
  name: string;
  constructor(theName: string) { 
    this.name = theName; 
  }
  move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal2 {
  //如果派生类包含了一个构造函数, 那么它 必须调用 super() ,它会执行基类的构造函数.
  //在构造函数里访问 this的属性之前, 一定要调用 super(). 这个是TypeScript强制执行的一条重要规则.
  constructor(name: string) { 
    super(name); 
  }

  //重写了父类的move()函数
  move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
  }
}

class Horse extends Animal2 {
  constructor(name: string) { 
    super(name); 
  }

  //重写了父类的move()函数
  move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move(); //它会调用 Snake 里重写的方法
tom.move(34); //即使被声明为 Animal 类型, 但因为值是 Horse 类型, 所以它会调用 Horse 里重写的方法

// 运行结果
// Slithering...
// Sammy the Python moved 5m.
// Galloping...
// Tommy the Palomino moved 34m.

//3.修饰符: public, private, and protected 

//3.1 public 修饰符
//成员默认为public 

//3.2 private 修饰符

class Animal3 {
  private name: string;//定义了一个私有属性
  constructor(theName: string) { this.name = theName; }
}

// new Animal3("Cat").name; // 编译错误: 'name' 是私有的.

// 如果其中一个类型里包含一个 private 成员, 那么只有当另外一个类型中也存在这样一个 private 成员,
// 并且它们都是来自同一处声明时, 我们才认为这两个类型是兼容的. 对于 protected 成员也使用这个规则.
class Rhino extends Animal3 {
  constructor() { super("Rhino"); }

  public getName() {
    // return `Hello, my name is ${this.name}`;// 编译错误: 'name' 是私有的.
  }
}

class Employee {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

let animal = new Animal3("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
// animal = employee; // 错误: 尽管 Employee 里也有一个私有成员 name，但它明显不是 Animal 里面定义的那个, 所以 Animal 与 Employee 不兼容.

// 3.3 protect 修饰符
// protected 成员在派生类中仍然可以访问

class Person {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Employee2 extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name)
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee2("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // 编译错误: 'name' 是私有的.

// 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。
class Person2 {
  protected name: string;
  protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee3 extends Person2 {
  private department: string;

  constructor(name: string, department: string) {
      super(name);
      this.department = department;
  }

  public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard2 = new Employee3("Howard", "Sales");
// let john = new Person2("John"); // 编译错误: 'Person' 的构造函数是被保护的.

//4.修饰符: readonly

class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor (theName: string) {
      this.name = theName;
  }
}
let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 编译错误! name 是只读的.

// 5.参数属性
// 在构造函数里把声明和赋值合并至一处.参数属性通过给构造函数参数前面添加一个访问修饰符来声明
class Octopus2 {
  constructor(readonly testParam1: string, private testParam2: string, public testParam3: string) {
  }

  public printParam2() {
    console.log(this.testParam2);
  }
}

let oct = new Octopus2("param1", "param2", "param3");
console.log(oct.testParam1);
oct.printParam2();
console.log(oct.testParam3);

// 6.存取器
// TypeScript支持通过getters/setters来截取对对象成员的访问

class Employee4 {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    this._fullName = newName;
  }
}

// 存取器要求你将编译器设置为输出ECMAScript 5或更高. 不支持降级到ECMAScript 3.
// 只带有 get 不带有 set 的存取器自动被推断为 readonly. 这在从代码生成 .d.ts文件时是有帮助的, 因为利用这个属性的用户会看到不允许够改变它的值.

// 7.静态属性(static)

// 静态成员存在于类本身上面而不是类的实例上。 

class Grid {
  // 使用 static 定义 origin 属性, 它是所有网格都会用到的属性
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
    // 需要在 静态属性前面 前面加上类名, 用来访问静态属性
    // 我们使用 Grid.origin 来访问
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

// 8.抽象类
// 抽象类做为其它派生类的基类使用. 它们一般不会直接被实例化. 不同于接口,抽象类可以包含成员的实现细节.

// abstract 关键字 这里定义了一个抽象类
abstract class Department {
  constructor(public name: string) {
  }

  printName(): void {
    console.log('Department name: ' + this.name);
  }

  // abstract 关键字 在这里定义了一个抽象方法, 必须在派生类中实现
  // 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现,可以于 protected, public 修饰符一起使用
  abstract printMeeting(): void;
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
    console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 编译错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 编译错误: 方法在声明的抽象类中不存在

// 9.高级技巧

// 9.1 使用类的构造函数
class Greeter_2 {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
      if (this.greeting) {
          return "Hello, " + this.greeting;
      }
      else {
          return Greeter_2.standardGreeting;
      }
  }
}

let greeter1: Greeter_2;
greeter1 = new Greeter_2();
console.log(greeter1.greet());

// 我们使用 typeof Greeter, 取Greeter类的类型, 而不是实例的类型, 包含了类的所有静态成员和构造函数
let greeterMaker: typeof Greeter_2 = Greeter_2;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter_2 = new greeterMaker();
console.log(greeter2.greet());

// 9.2 把类当作接口
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};