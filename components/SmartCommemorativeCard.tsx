"use client";

import { useState, useEffect, useMemo } from 'react';
import styles from './SmartCommemorativeCard.module.css';
import eventsData from '@/data/events.json';
import {
  EXCLUDED_EVENT_IDS,
  DIGITAL_ONLY_EVENT_IDS,
  daysUntil,
  formatCountdown,
  getEventStatus,
  getEventDisplayConfig,
  TN_230_DATE,
  USA_250_DATE,
  type EventStatus,
} from '@/lib/eventUtils';

interface Event {
  id: string;
  title: string;
  date: string;
  endDate: string | null;
}

interface ProcessedEvent {
  id: string;
  title: string;
  icon: string;
  date: string;
  endDate: string | null;
  days: number;
  status: EventStatus;
}

// Parse date string as local time (avoids timezone offset issues)
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export default function SmartCommemorativeCard() {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);

    // Update at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      setCurrentDate(new Date());
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [currentDate]);

  // Filter and process events - skip lectures and digital-only events
  const nextEvent = useMemo((): ProcessedEvent | null => {
    const eligibleEvents = (eventsData.events as Event[])
      .filter(e => !EXCLUDED_EVENT_IDS.includes(e.id))
      .filter(e => !DIGITAL_ONLY_EVENT_IDS.includes(e.id))
      .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime());

    for (const event of eligibleEvents) {
      const status = getEventStatus(event.date, event.endDate);
      if (status === 'passed') continue;

      const displayConfig = getEventDisplayConfig(event.id);
      const days = daysUntil(event.date);

      return {
        id: event.id,
        title: displayConfig?.title || event.title,
        icon: displayConfig?.icon || '📅',
        date: event.date,
        endDate: event.endDate,
        days,
        status,
      };
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  // Milestone countdowns
  const tn230Days = daysUntil(TN_230_DATE);
  const usa250Days = daysUntil(USA_250_DATE);
  const tn230Status = getEventStatus(TN_230_DATE, null);
  const usa250Status = getEventStatus(USA_250_DATE, null);

  // Format date for display (using local parsing)
  const formatEventDate = (date: string, endDate: string | null): string => {
    const start = parseLocalDate(date);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    if (endDate) {
      const end = parseLocalDate(endDate);
      return `${start.toLocaleDateString('en-US', options)} – ${end.toLocaleDateString('en-US', options)}`;
    }
    return start.toLocaleDateString('en-US', options);
  };

  if (!nextEvent) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>2026 Commemorative Year</span>
        </div>
        <div className={styles.featured}>
          <span className={styles.featuredIcon}>🌅</span>
          <h3 className={styles.featuredTitle}>2027 Season</h3>
          <p className={styles.featuredDate}>Coming Soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {/* Corner accents */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>2026 Commemorative Year</span>
      </div>

      {/* Featured Event */}
      <div className={`${styles.featured} ${
        nextEvent.status === 'happening' ? styles.featuredHappening : ''
      }`}>
        <span className={styles.featuredStatus}>
          {nextEvent.status === 'happening' ? '● Happening Now' : 'Coming Next'}
        </span>
        <span className={styles.featuredIcon}>{nextEvent.icon}</span>
        <h3 className={styles.featuredTitle}>{nextEvent.title}</h3>
        <p className={styles.featuredDate}>
          {formatEventDate(nextEvent.date, nextEvent.endDate)}
        </p>
        <p className={styles.featuredCountdown}>
          {mounted ? (
            nextEvent.status === 'happening' ? 'Today!' : formatCountdown(nextEvent.days)
          ) : '—'}
        </p>
      </div>

      {/* Milestone Countdowns */}
      <div className={styles.milestones}>
        <div className={styles.milestone}>
          <span className={styles.milestoneLabel}>
            {tn230Status === 'passed' ? '✓ ' : ''}TN 230
          </span>
          <span className={styles.milestoneDays}>
            {mounted ? (
              tn230Status === 'passed' ? 'Done' : `${tn230Days}d`
            ) : '—'}
          </span>
        </div>
        <span className={styles.milestoneDivider}>·</span>
        <div className={styles.milestone}>
          <span className={styles.milestoneLabel}>
            {usa250Status === 'passed' ? '✓ ' : ''}USA 250
          </span>
          <span className={styles.milestoneDays}>
            {mounted ? (
              usa250Status === 'passed' ? 'Done' : `${usa250Days}d`
            ) : '—'}
          </span>
        </div>
      </div>
    </div>
  );
}
