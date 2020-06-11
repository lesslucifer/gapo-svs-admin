import * as _ from "lodash";

export class ErrorMessageInterpolationService {
    static interpolators: IErrorMessageInterpolator[] = []

    static interpolate(err: any, defaultMessage?: string): string {
        try {
            for (const inter of this.interpolators) {
                const msg = inter.interpolate(err);
                if (msg) return msg;
            }
        }
        catch (err) {
            return defaultMessage;
        }

        return defaultMessage;
    }

    static initInterpolators() {
        // last interpolator
        this.interpolators.push(new FuncInterpolator((err) => err.message))
        this.interpolators.push(new FuncInterpolator((err) => _.get(err, 'err.message')))
        this.interpolators.push(new FuncInterpolator((err) => _.get(err, 'err.smessage')))
    }
}

export interface IErrorMessageInterpolator {
    interpolate(err: any): string;
}

export interface IErrorMessageInterpolatorFunc {
    (err: any): string;
}

export class FuncInterpolator implements IErrorMessageInterpolator {
    constructor(private f: IErrorMessageInterpolatorFunc) {}

    interpolate(err: any): string {
        return this.f(err);
    }
}

ErrorMessageInterpolationService.initInterpolators();