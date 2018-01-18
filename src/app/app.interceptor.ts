import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import * as moment from 'moment';

export class ServerURLInterceptor implements Interceptor {

  // REQUEST INTERCEPTOR, Send to the Server.
  public interceptBefore(request: InterceptedRequest): InterceptedRequest {
    let body = request.options.body
    if (body) {
      body = this.convertDatesToUtc(body)
      request.options.body = body
    }
    return request;
  }

  // RESPONSE INTERCEPTOR. Receive From the Server
  public interceptAfter(response: InterceptedResponse): InterceptedResponse {
    let body = response.response.json()
    if (body) {
      this.convertDatesToLocal(body)
      response.response['_body'] = body
    }
    return response;
  }

  // CONVERT DATES FROM UTC TO LOCAL TIME
  private convertDatesToLocal (input) {
    var regex = /\d{4}-\d{2}-\d{2}T?\s?\d{2}:\d{2}(:\d{2}\.\d{3})?/;
    if (typeof input === "object") {
      for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;
        var value = input[key];
        var match;
        if (typeof value === "string" && (match = value.match(regex))) {
          // check if string is actually Json object
          try {
            var object = JSON.parse(value);
            this.convertDatesToLocal(object);
            input[key] = JSON.stringify(object);
          }
          catch (e) {
            var dt = moment.utc(value);
            var converted = moment(dt.toDate()).format();
            input[key] = converted;
          }
        } else if (typeof value === "object") {
          // Recurse into object
          this.convertDatesToLocal(value);
        }
      }
    }
  }

  // CONVERT DATES FROM LOCAL TIME TO UTC
  private convertDatesToUtc (data) {
    try {
      if (typeof data === "object") {
        this.convertToUTC(data);
        return data;
      } else {
        var object = JSON.parse(data);
        this.convertToUTC(object);
        return JSON.stringify(object);
      }
    } catch (e) {
      return data;
    }
  }

  // FUNCTION THAT CONVERTS THE TIME TO UTC
  private convertToUTC (input) {
    var regex = /\d{4}-\d{2}-\d{2}T?\s?\d{2}:\d{2}(:\d{2}\.\d{3})?/;
    if (typeof input === "object") {
      for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;
        var value = input[key];
        var match;
        if (typeof value === "string" && (match = value.match(regex))) {
              var dt = moment(value).utc();
              input[key] = dt;
        } else if (typeof value === "object") {
          // Recurse into object
          this.convertToUTC(value);
        }
      }
    }
  }
}
