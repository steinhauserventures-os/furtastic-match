import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PawPrint, ArrowLeft, ArrowRight, HelpCircle, Search, Dog, Scale, Users, Heart, User,
  Zap, Sofa, Mountain, Home as HomeIcon, Building2, Trees, Wheat, Scissors, Frown,
  Sparkles, GraduationCap, Sprout, ThumbsUp, Trophy, Ruler, Shuffle, Baby, Meh,
} from 'lucide-react';
import Icon, { BRAND_ACCENT } from '../components/Icon';
import CustomSlider from '../components/CustomSlider';
import PawPrintMark from '../components/PawPrintMark';
import { trackEvent, capturePostHogEvent } from '../lib/analytics';
import { runMatchingEngine, encodeResults, QuizAnswers } from '../lib/matchingEngine';

/** Map the 0-100 activity slider to a human-readable lifestyle label. */
function activityLabel(value: number): string {
  if (value <= 20) return 'couch-potato';
  if (value <= 40) return 'gentle-walker';
  if (value <= 60) return 'moderately-active';
  if (value <= 80) return 'very-active';
  return 'trail-runner';
}

export default function Quiz() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswers>({
    q1_mode: 'none',
    q1_breed1: '',
    q1_breed2: '',
    who: '',
    activity: 50,
    space: '',
    grooming: 50,
    experience: '',
    size: '',
    kids: 65,
  });

  useEffect(() => {
    trackEvent('quiz_start');
    
    const handleBeforeUnload = () => {
      trackEvent('quiz_abandon', { last_question_reached: currentQ });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleNext = async () => {
    trackEvent('quiz_progress', { question_number: currentQ });
    
    if (currentQ < 8) {
      setCurrentQ(prev => prev + 1);
    } else {
      trackEvent('quiz_complete');
      setShowLoading(true);
      
      // Simulate network/processing delay for drama
      await new Promise(r => setTimeout(r, 2500));
      
      const result = runMatchingEngine(answers);
      const hash = encodeResults(
        result.matches.map(m => m.id),
        result.wildcard?.id ?? null
      );

      // Fire the detailed PostHog quiz_complete event with breed + quiz properties.
      // This is separate from the generic trackEvent('quiz_complete') above so that
      // we have the computed top-match breed name available here.
      capturePostHogEvent('quiz_complete', {
        breed: result.matches[0]?.name ?? 'unknown',
        household_size: answers.who,
        lifestyle: activityLabel(answers.activity),
        timestamp: new Date().toISOString(),
        // bonus context for segmentation
        space: answers.space,
        experience: answers.experience,
        size_preference: answers.size,
      });

      // Persist answers for the results page's "why this matched you" personalization.
      // sessionStorage (not the URL) — personalization is for the just-finished-quiz
      // view and is meaningless on a link shared to someone who didn't take the quiz.
      // Scope to this result `hash` so the answers can only personalize THESE breeds
      // (guards against stale answers being applied to a shared link opened later).
      try {
        sessionStorage.setItem('fm_quiz_answers', JSON.stringify({ hash, answers }));
      } catch {
        // sessionStorage unavailable (private mode quota etc.) — results page falls back gracefully
      }
      navigate(`/results?r=${hash}`);
    }
  };

  const handleBack = () => {
    if (currentQ > 1) setCurrentQ(prev => prev - 1);
  };

  if (showLoading) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ animation: 'spin 2s linear infinite', marginBottom: '24px', display: 'flex' }}><Icon icon={PawPrint} size={64} color={BRAND_ACCENT} /></div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: 'var(--text-primary)', marginBottom: '8px' }}>Sniffing out your matches...</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Scoring 40 breeds against your answers</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['var(--cta)', 'var(--teal)', 'var(--accent)'].map((color, i) => (
            <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', background: color, animation: 'bounce 1s infinite', animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
        <style>
          {`
            @keyframes spin { 100% { transform: rotate(360deg); } }
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Quiz Nav */}
      <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {currentQ > 1 ? (
          <button onClick={handleBack} className="btn-outline" style={{ padding: '8px 16px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Icon icon={ArrowLeft} size={16} /> Back</button>
        ) : <div />}
        <div style={{ textAlign: 'right', fontSize: '13px', color: 'var(--text-muted)' }}>Question {currentQ} of 8</div>
      </div>
      
      {/* Progress — one paw print per question, filled as you advance */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '4px 24px 18px' }}>
        {Array.from({ length: 8 }, (_, i) => i + 1).map(q => (
          <PawPrintMark
            key={q}
            size={q === currentQ ? 18 : 13}
            color={q <= currentQ ? 'var(--cta)' : 'var(--border)'}
            style={{ transition: 'all 0.2s ease', flexShrink: 0 }}
          />
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          
          {currentQ === 1 && (
            <div className="q-slide">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}><Icon icon={HelpCircle} size={56} color={BRAND_ACCENT} /></div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px', textAlign: 'center', marginBottom: '32px' }}>Already have a breed in mind?</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  { id: 'none', icon: Search, label: 'Nope — help me find one!' },
                  { id: 'one', icon: Dog, label: 'Yes, I have one in mind' },
                  { id: 'two', icon: Scale, label: 'I\'m deciding between two breeds' }
                ].map(opt => (
                  <div 
                    key={opt.id} 
                    className="card"
                    style={{ 
                      padding: '16px', 
                      cursor: 'pointer', 
                      borderColor: answers.q1_mode === opt.id ? 'var(--cta)' : 'var(--border)',
                      background: answers.q1_mode === opt.id ? 'var(--bg-muted)' : 'var(--bg-card)'
                    }}
                    onClick={() => setAnswers({...answers, q1_mode: opt.id as any})}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}><Icon icon={opt.icon} size={20} color={BRAND_ACCENT} />{opt.label}</span>
                  </div>
                ))}
              </div>
              
              {answers.q1_mode === 'one' && (
                <input 
                  type="text" 
                  placeholder="Type a breed name..." 
                  value={answers.q1_breed1}
                  onChange={e => setAnswers({...answers, q1_breed1: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid var(--border)', marginBottom: '32px' }}
                />
              )}
              {answers.q1_mode === 'two' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <input 
                    type="text" 
                    placeholder="Breed 1..." 
                    value={answers.q1_breed1}
                    onChange={e => setAnswers({...answers, q1_breed1: e.target.value})}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid var(--border)' }}
                  />
                  <input 
                    type="text" 
                    placeholder="Breed 2..." 
                    value={answers.q1_breed2}
                    onChange={e => setAnswers({...answers, q1_breed2: e.target.value})}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid var(--border)' }}
                  />
                </div>
              )}
              
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', justifyContent: 'center' }}
                onClick={handleNext}
                disabled={answers.q1_mode === 'none' ? false : answers.q1_mode === 'one' ? answers.q1_breed1.length < 2 : answers.q1_breed1.length < 2 || answers.q1_breed2.length < 2}
              >
                Next <Icon icon={ArrowRight} size={18} />
              </button>
            </div>
          )}

          {currentQ === 2 && (
            <div className="q-slide">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}><Icon icon={Users} size={56} color={BRAND_ACCENT} /></div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px', textAlign: 'center', marginBottom: '32px' }}>Who's the dog for?</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  { id: 'family', icon: Users, label: 'Family with kids' },
                  { id: 'couple', icon: Heart, label: 'Couple' },
                  { id: 'solo', icon: User, label: 'Just me' }
                ].map(opt => (
                  <div 
                    key={opt.id} 
                    className="card"
                    style={{ 
                      padding: '16px', 
                      cursor: 'pointer', 
                      borderColor: answers.who === opt.id ? 'var(--cta)' : 'var(--border)',
                      background: answers.who === opt.id ? 'var(--bg-muted)' : 'var(--bg-card)'
                    }}
                    onClick={() => setAnswers({...answers, who: opt.id})}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}><Icon icon={opt.icon} size={20} color={BRAND_ACCENT} />{opt.label}</span>
                  </div>
                ))}
              </div>
              
              <button className="btn-primary" style={{ width: '100%', padding: '16px', justifyContent: 'center' }} onClick={handleNext} disabled={!answers.who}>Next <Icon icon={ArrowRight} size={18} /></button>
            </div>
          )}

          {currentQ === 3 && (
            <div className="q-slide">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}><Icon icon={Zap} size={56} color={BRAND_ACCENT} /></div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px', textAlign: 'center', marginBottom: '32px' }}>How active is your household?</h2>
              
              <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--cta)', fontSize: '18px', marginBottom: '24px', minHeight: '28px' }}>
                {answers.activity <= 20 ? "Total couch potato" :
                 answers.activity <= 40 ? "Gentle walker" :
                 answers.activity <= 60 ? "Moderately active" :
                 answers.activity <= 80 ? "Very active" : "Trail runner"}
              </div>
              
              <CustomSlider value={answers.activity} onChange={v => setAnswers({...answers, activity: v})} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Icon icon={Sofa} size={14} /> Binge-watcher</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Trail runner <Icon icon={Mountain} size={14} /></span>
              </div>
              
              <button className="btn-primary" style={{ width: '100%', padding: '16px', justifyContent: 'center', marginTop: '48px' }} onClick={handleNext}>Next <Icon icon={ArrowRight} size={18} /></button>
            </div>
          )}

          {currentQ === 4 && (
            <div className="q-slide">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}><Icon icon={HomeIcon} size={56} color={BRAND_ACCENT} /></div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px', textAlign: 'center', marginBottom: '32px' }}>How much space do you have?</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  { id: 'apartment', icon: Building2, label: 'Apartment / small space' },
                  { id: 'house-no-yard', icon: HomeIcon, label: 'House, no yard' },
                  { id: 'house-yard', icon: Trees, label: 'House with a yard' },
                  { id: 'rural', icon: Wheat, label: 'Wide open spaces (rural)' }
                ].map(opt => (
                  <div 
                    key={opt.id} 
                    className="card"
                    style={{ 
                      padding: '16px', 
                      cursor: 'pointer', 
                      borderColor: answers.space === opt.id ? 'var(--cta)' : 'var(--border)',
                      background: answers.space === opt.id ? 'var(--bg-muted)' : 'var(--bg-card)'
                    }}
                    onClick={() => setAnswers({...answers, space: opt.id})}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}><Icon icon={opt.icon} size={20} color={BRAND_ACCENT} />{opt.label}</span>
                  </div>
                ))}
              </div>
              
              <button className="btn-primary" style={{ width: '100%', padding: '16px', justifyContent: 'center' }} onClick={handleNext} disabled={!answers.space}>Next <Icon icon={ArrowRight} size={18} /></button>
            </div>
          )}

          {currentQ === 5 && (
            <div className="q-slide">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}><Icon icon={Scissors} size={56} color={BRAND_ACCENT} /></div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px', textAlign: 'center', marginBottom: '32px' }}>How much grooming time can you give?</h2>
              
              <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--cta)', fontSize: '18px', marginBottom: '24px', minHeight: '28px' }}>
                {answers.grooming <= 20 ? "Minimal — just the basics" :
                 answers.grooming <= 40 ? "Occasional brushing is fine" :
                 answers.grooming <= 60 ? "Some grooming is fine" :
                 answers.grooming <= 80 ? "Regular grooming OK" : "Daily grooming, no problem"}
              </div>
              
              <CustomSlider value={answers.grooming} onChange={v => setAnswers({...answers, grooming: v})} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Icon icon={Frown} size={14} /> Brush? What's that?</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>I own a full kit <Icon icon={Sparkles} size={14} /></span>
              </div>
              
              <button className="btn-primary" style={{ width: '100%', padding: '16px', justifyContent: 'center', marginTop: '48px' }} onClick={handleNext}>Next <Icon icon={ArrowRight} size={18} /></button>
            </div>
          )}

          {currentQ === 6 && (
            <div className="q-slide">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}><Icon icon={GraduationCap} size={56} color={BRAND_ACCENT} /></div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px', textAlign: 'center', marginBottom: '32px' }}>Any experience with dogs?</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  { id: 'first', icon: Sprout, label: 'First-timer — never owned a dog' },
                  { id: 'some', icon: ThumbsUp, label: 'Some experience' },
                  { id: 'seasoned', icon: Trophy, label: 'Seasoned owner — I\'ve done this before' }
                ].map(opt => (
                  <div 
                    key={opt.id} 
                    className="card"
                    style={{ 
                      padding: '16px', 
                      cursor: 'pointer', 
                      borderColor: answers.experience === opt.id ? 'var(--cta)' : 'var(--border)',
                      background: answers.experience === opt.id ? 'var(--bg-muted)' : 'var(--bg-card)'
                    }}
                    onClick={() => setAnswers({...answers, experience: opt.id})}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}><Icon icon={opt.icon} size={20} color={BRAND_ACCENT} />{opt.label}</span>
                  </div>
                ))}
              </div>
              
              <button className="btn-primary" style={{ width: '100%', padding: '16px', justifyContent: 'center' }} onClick={handleNext} disabled={!answers.experience}>Next <Icon icon={ArrowRight} size={18} /></button>
            </div>
          )}

          {currentQ === 7 && (
            <div className="q-slide">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}><Icon icon={Ruler} size={56} color={BRAND_ACCENT} /></div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px', textAlign: 'center', marginBottom: '32px' }}>What size dog fits your life?</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  { id: 'small', icon: Dog, label: 'Small (under 25 lbs)' },
                  { id: 'medium', icon: Dog, label: 'Medium (25–60 lbs)' },
                  { id: 'large', icon: Dog, label: 'Large (60+ lbs)' },
                  { id: 'any', icon: Shuffle, label: 'No preference — show me the best match' }
                ].map(opt => (
                  <div 
                    key={opt.id} 
                    className="card"
                    style={{ 
                      padding: '16px', 
                      cursor: 'pointer', 
                      borderColor: answers.size === opt.id ? 'var(--cta)' : 'var(--border)',
                      background: answers.size === opt.id ? 'var(--bg-muted)' : 'var(--bg-card)'
                    }}
                    onClick={() => setAnswers({...answers, size: opt.id})}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}><Icon icon={opt.icon} size={20} color={BRAND_ACCENT} />{opt.label}</span>
                  </div>
                ))}
              </div>
              
              <button className="btn-primary" style={{ width: '100%', padding: '16px', justifyContent: 'center' }} onClick={handleNext} disabled={!answers.size}>Next <Icon icon={ArrowRight} size={18} /></button>
            </div>
          )}

          {currentQ === 8 && (
            <div className="q-slide">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}><Icon icon={Baby} size={56} color={BRAND_ACCENT} /></div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px', textAlign: 'center', marginBottom: '32px' }}>How important is it that your dog is great with kids?</h2>
              
              <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--cta)', fontSize: '18px', marginBottom: '24px', minHeight: '28px' }}>
                {answers.kids <= 20 ? "Not a factor" :
                 answers.kids <= 40 ? "Slightly important" :
                 answers.kids <= 60 ? "Somewhat important" :
                 answers.kids <= 80 ? "Pretty important" : "Non-negotiable"}
              </div>
              
              <CustomSlider value={answers.kids} onChange={v => setAnswers({...answers, kids: v})} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Icon icon={Meh} size={14} /> Not a factor</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Non-negotiable <Icon icon={Heart} size={14} /></span>
              </div>
              
              <button className="btn-primary" style={{ width: '100%', padding: '16px', justifyContent: 'center', marginTop: '48px' }} onClick={handleNext}>Find My Matches <Icon icon={PawPrint} size={18} /></button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
