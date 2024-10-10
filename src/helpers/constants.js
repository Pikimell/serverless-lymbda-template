import { env } from '../utils/env.js';
export const TELEGRAM_BOT_API = env('TG_TOKEN');
export const ONE_HOUR = 60 * 60 * 1000;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_WEEK = ONE_DAY * 7;
export const ONE_MONTH = ONE_DAY * 31;
