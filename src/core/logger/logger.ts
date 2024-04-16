import { NESTJS_BOILERPLATE_TRACE_ID } from '@es/common';
import { Inject, Injectable, Scope } from '@nestjs/common';
import * as bunyan from 'bunyan';
import { ILog } from './interface/Log';
import { LOGGER_INSTANCE } from './types';

@Injectable({
  scope: Scope.REQUEST,
})
export class AppLogger implements ILog {
  private readonly bunyanLog: bunyan;
  private _metadata: object = {};
  private _traceId: any;

  constructor(
    @Inject(LOGGER_INSTANCE)
    private readonly log,
  ) {
    this.bunyanLog = this.log;
  }

  public setMetadata(metadata: object): this {
    this._metadata = {
      ...this._metadata,
      ...metadata,
    };
    return this;
  }

  public setContext(ctx: string): this {
    this._metadata = {
      ...this._metadata,
      ctx,
    };

    return this;
  }

  get traceId(): any {
    return this._traceId;
  }

  public setTraceId(traceId: string): this {
    this._traceId = traceId;
    this.setMetadata({ [NESTJS_BOILERPLATE_TRACE_ID]: traceId });
    return this;
  }

  public error(message: string, error: Error, metadata?: object): void {
    this.bunyanLog.error(
      {
        error: error.stack,
        ...(metadata || {}),
      },
      message,
    );
  }

  public warn(message: string, metadata?: object): void {
    this.bunyanLog.warn(
      {
        ...this._metadata,
        ...(metadata || {}),
      },
      message,
    );
  }

  public info(message: string, metadata?: object): void {
    this.bunyanLog.info(
      {
        ...this._metadata,
        ...(metadata || {}),
      },
      message,
    );
  }

  public debug(message: string, metadata?: object): void {
    this.bunyanLog.debug(
      {
        ...this._metadata,
        ...(metadata || {}),
      },
      message || {},
    );
  }

  public trace(message: string, metadata?: object): void {
    this.bunyanLog.trace(
      {
        ...this._metadata,
        ...(metadata || {}),
      },
      message,
    );
  }
}
