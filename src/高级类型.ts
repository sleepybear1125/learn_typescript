//1.Union Types(联合类型)

//引入联合类型为了解决
//当一个函数的参数既可以是类型A又可以是类型B的时候,这是如果定义类型any,那么函数传入的参数既不是A类型又不是B类型时,TypeScript不会报错,例子
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
  
padLeft("Hello world", 4); // 返回"    Hello world"

padLeft("Hello world", true);// 成功编译,但运行时报错

//我们可以使用联合类型改写代码
//联合类型表示一个值可以是几种类型之一, 用 | 分割每种类型

function padLeft2(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

//如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  return {fly:()=>{},layEggs:()=>{}};
}

let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim();    // errors

//区分类型

type NetworkLoadingState = {
  state: "loading";
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};


type NetworkFailedState = {
  state: "failed";
  code: number;
};



// Create a type which represents only one of the above types
// but you aren't sure which it is yet.
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;


function logger(state: NetworkState) {
  // TypeScript不知道会传入哪种类型,尝试访问不共享的属性,会引发错误
  // state.code;

  // 通过 switch 语法,TypeScript可以缩小类型
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      // 这里state一定为 NetworkFailedState 类型,所以可以正确访问 code 属性
      return `Error ${state.code} downloading`;
    case "success":
      // 这里state一定为 NetworkSuccessState 类型
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}


type NetworkFromCachedState = {
  state: "from_cache";
  id: string
  response: NetworkSuccessState["response"]
}

type NetworkState2 =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState
  | NetworkFromCachedState;

//如果我们为 NetworkState 加入一个新类型 NetworkFromCachedState,那么我们要需要同时更新logger函数
//如果要让编译器来提醒我们更新logger函数,那么有两种办法
//方法一: 在tsconfig.json中设置 --strictNullChecks 为true, 并且制定返回值类型,如下logger2

function logger2(state: NetworkState2): string {
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      return `Error ${state.code} downloading`;
    case "success":
      // 这里state一定为 NetworkSuccessState 类型
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}

//方法二: 使用never类型
function assertNever(s: never): never {
  throw new Error("Unexpected object: " + s)
}

function logger3(s: NetworkState2) {
  switch (s.state) {
    case "loading":
      return "loading request";
    case "failed":
      return `failed with code ${s.code}`;
    case "success":
      return "got response";
    default: 
      //build error: Argument of type 'NetworkFromCachedState' is not assignable to parameter of type 'never'.
      //return assertNever(s);
  }
}

//2.Intersection Types(交叉类型)
//交叉类型将多种类型组合为一种。 这使您可以将现有类型加在一起，以获得具有所需所有功能的单个类型。 
//这意味着此类型的对象将具有所有类型的所有成员
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// These interfaces are composed to have
// consistent error handling, and their own data.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtworksResponse = (response: ArtworksResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }
  console.log(response.artworks);
};

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }
  console.log(response.artists);
};