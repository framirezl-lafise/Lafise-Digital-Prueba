import { COMING_SOON_COPY } from '@/constants/coming-soon';

describe('coming soon copy', () => {
  it('uses a working-for-you message instead of a 404 code', () => {
    expect(COMING_SOON_COPY.title).toBe('En LAFISE seguimos trabajando para ti');
    expect(COMING_SOON_COPY.title.toLowerCase()).not.toContain('404');
  });

  it('tells the user the feature is coming soon', () => {
    expect(COMING_SOON_COPY.subtitle).toBe('Esta funcionalidad estará disponible próximamente');
  });
});
