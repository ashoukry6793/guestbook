import { ERRORS, BaseError, UnExpectedError } from "../models/Erros";

type NotificationType = string & ("success" | "error" | "warning");

export class Notification {
  type: NotificationType;
  message: string;

  static successfulOperation(): Notification {
    return new Notification(
      "success",
      "Your Operation Has Been Done Successfully"
    );
  }

  static from(error: BaseError): Notification {
    if (error.type && error.type in ERRORS) {
      return new Notification("error", `${error.message}: ${error.details}`);
    }
    return new Notification("error", new UnExpectedError(error.message).message);
  }

  constructor(
    type: NotificationType,
    message: string,
  ) {
    this.type = type;
    this.message = message;
  }
}

class NotificationServiceSingleton {
  notification: Notification | undefined;
  observables: Array<() => void> = [];

  constructor() {
    this.notification = undefined;
  }

  notify(notification: Notification): void {
    this.notification = notification;
    this.observables.forEach(observable => {
      observable();
    })
  }

  subscribe(handler: () => void) {
    this.observables.push(handler);
    return this.observables.length - 1;
  }

  unsubscribe(index: number) {
    this.observables.splice(index, 1);
  }

  reset(): void {
    this.notification = undefined;
  }
}

export type NotificationService = NotificationServiceSingleton;
export const notificationService = new NotificationServiceSingleton();
