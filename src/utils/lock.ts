import * as AsyncLock from 'async-lock';

class Lock {
    static INST = new Lock();

    private asyncLock = new AsyncLock();

    async acquire(key: string, opts?: any) {
        return new Promise<LockKey>((res, rej) => {
            const lockKey = new LockKey(this);
            return this.asyncLock.acquire(key, (done) => {
                lockKey.__done = done;
                res(lockKey);
            }, opts);
        })
    }

    async sync(key: string, asyncHandler: () => Promise<any>, opts?: any) {
        let _key: LockKey;
        try {
            _key = await this.acquire(key, opts);
            return asyncHandler();
        }
        catch (err) {
            throw err;
        }
        finally {
            _key && _key.unlock();
        }
    }
}

export class LockKey {
    __done?: (err, ret) => any = undefined;

    constructor(public lock: Lock) {}

    async unlock() {
        return this.__done && this.__done(undefined, undefined);
    }
}

export class SkipLock {
    static INST = new SkipLock();

    private lockedKeys = new Set<string>();

    async sync(key: string, asyncHandler: () => Promise<any>) {
        if (this.lockedKeys.has(key)) return;

        try {
            this.lockedKeys.add(key);
            return await asyncHandler();
        }
        catch (err) {
            throw err;
        }
        finally {
            this.lockedKeys.delete(key);
        }
    }

    static sync(key: string, asyncHandler: () => Promise<any>) {
        return this.INST.sync(key, asyncHandler);
    }
}

export default Lock;