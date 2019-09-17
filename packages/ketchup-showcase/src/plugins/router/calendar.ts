export default [
  {
    path: '/calendar/basic',
    name: 'calendarBasic',
    component: () => import('@/views/calendar/CalendarBasic.vue'),
  },
  {
    path: '/calendar/style',
    name: 'calendarStyle',
    component: () => import('@/views/calendar/CalendarStyle.vue'),
  },
];
