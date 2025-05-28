export class RandomUserGenerator {
  private static adjectives: string[] = [
    'magical', 'subconscious', 'whimsical', 'ethereal', 'luminous',
    'quirky', 'enigmatic', 'sparkling', 'mystical', 'vibrant',
    'dreamy', 'radiant', 'serene', 'cosmic', 'playful',
    'surreal', 'celestial', 'harmonic', 'abstract', 'dynamic'
  ];

  private static nouns: string[] = [
    'stiff', 'sname', 'wanderer', 'dream', 'spark',
    'whisper', 'jester', 'muse', 'voyager', 'echo',
    'puzzle', 'mirage', 'wisp', 'fable', 'odyssey',
    'rune', 'sphinx', 'alchemist', 'phoenix', 'wizard'
  ];

  private static colors: string[] = [
    'red', 'blue', 'green', 'purple', 'orange',
    'yellow', 'pink', 'teal', 'indigo', 'violet',
    'amber', 'emerald', 'ruby', 'sapphire', 'gold'
  ];

  static generateUsername(): string {
    const adj = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
    const noun = this.nouns[Math.floor(Math.random() * this.nouns.length)];
    return `${adj} ${noun}`;
  }

  static generateAvatarUrl(username: string, size: number = 200): string {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = this.colors[Math.abs(hash) % this.colors.length];

    const seed = username.replace(/\s+/g, '-').toLowerCase();

    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&size=${size}&backgroundColor=${color}`;
  }

  static generateUser(): { username: string; avatarUrl: string } {
    const username = this.generateUsername();
    const avatarUrl = this.generateAvatarUrl(username);
    return { username, avatarUrl };
  }
}