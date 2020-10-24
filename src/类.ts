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

//3.public, private, and protected 修饰符

//3.1 public
//成员默认为public 

//3.2 private

class Animal3 {
  private name: string;//定义了一个私有属性
  constructor(theName: string) { this.name = theName; }
}

// new Animal3("Cat").name; // 编译错误: 'name' 是私有的.