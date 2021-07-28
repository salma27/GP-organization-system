export default interface PollAction<T>{
  run(data: T): void;
}
