interface ExceptionInput {
  message: string;
  fatal: boolean;
}

export interface EventInput {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

interface IdentifyInput {
  userId: string;
}

interface PageViewInput {
  pageTitle?: string;
  url?: string;
  path?: string;
}

export class AnalyticsManager {
  private trackingId;

  constructor(trackingId: string, debug = false) {
    this.trackingId = trackingId;

    this.initialize(debug);
  }

  // for v3
  initialize(debug: boolean): void {
    if (!this.isLoaded()) {
      if (process.env.EXTENSION_ENV === "production") {
        console.debug("initializing google analytics");
        (function (i, s, o, g, r, a, m) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          i["GoogleAnalyticsObject"] = r;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (i[r] =
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            i[r] ||
            function () {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line prefer-rest-params
              (i[r].q = i[r].q || []).push(arguments);
            }),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (i[r].l = 1 * new Date());
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          a.async = 1;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          a.src = g;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          m.parentNode.insertBefore(a, m);
        })(
          window,
          document,
          "script",
          `https://www.google-analytics.com/analytics${debug && "_debug"}.js`, // HTTPS!!!!!
          "ga",
        );
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.ga = function () {
          // eslint-disable-next-line prefer-rest-params
          console.log(arguments);
        };
      }
    }

    if (this.isLoaded()) {
      window.ga("create", `${this.trackingId}`, "auto"); // Enter your GA identifier
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.ga("set", "checkProtocolTask", function () {}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
      window.ga("set", "transport", "beacon");
      window.ga("require", "displayfeatures");
    }
  }

  isLoaded(): boolean {
    return !!window.ga && typeof window.ga === "function";
  }

  pageview({
    pageTitle = document.title,
    url = document.location.href,
    path = document.location.pathname,
  }: PageViewInput): void {
    if (!this.isLoaded()) {
      return;
    }
    window.ga("send", {
      hitType: "pageview",
      page: url,
      title: pageTitle,
      location: path,
    });
  }

  exception({ message, fatal }: ExceptionInput): void {
    if (!this.isLoaded()) {
      return;
    }
    window.ga("send", "exception", {
      exDescription: message,
      exFatal: fatal,
    });
  }

  identify({ userId }: IdentifyInput): void {
    if (!this.isLoaded()) {
      return;
    }
    window.ga("set", "userId", userId);
    // This will not send an event, so... send an event to flush both
    this.track({
      category: "authentication",
      action: "User identified",
    });
  }

  track({ category, action, label, value }: EventInput): void {
    if (!this.isLoaded()) {
      return;
    }
    window.ga("send", {
      hitType: "event",
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value,
    });
  }
}
