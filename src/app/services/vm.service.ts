import { Injectable } from '@angular/core';
import { VM } from '../VM';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../appconfig';
import { ServerResponse } from '../ServerResponse';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class VMService {
    private cachedVms: Map<string, VM> = new Map();

    constructor(
        private http: HttpClient,
        public ac: AppConfig
    ) { }

    public get(id: string) {
        return this.http.get('https://' + this.ac.getServer() + '/vm/' + id)
            .pipe(
                map((s: ServerResponse) => {
                    return JSON.parse(atob(s.content));
                }),
                tap((v: VM) => {
                    this.cachedVms.set(v.id, v);
                })
            )

    }
}