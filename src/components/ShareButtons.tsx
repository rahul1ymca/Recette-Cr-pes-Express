import { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Printer, Twitter } from 'lucide-react';
import { Language } from '../types';

interface ShareButtonsProps {
  lang: Language;
}

export function ShareButtons({ lang }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const pageTitle = lang === 'fr'
    ? 'Recette Facile Pâte à Crêpes : Inratable, Moelleuse et Rapide'
    : 'Easy Crepe Batter Recipe: Foolproof, Fluffy and Quick';

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://recette-pate-a-crepes.fr';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pageTitle,
          text: lang === 'fr'
            ? 'Découvre cette recette facile de pâte à crêpes inratable et sans grumeaux !'
            : 'Check out this easy, lump-free French crepe batter recipe!',
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${pageTitle}\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(pageTitle);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=crepes,recette,cuisine`, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="share-buttons" className="flex items-center flex-wrap gap-2 pt-3 pb-1 border-t border-b border-stone-200">
      <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-1">
        {lang === 'fr' ? 'Partager la recette :' : 'Share recipe:'}
      </span>

      {/* Native Web Share Button */}
      {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
        <button
          id="share-native-btn"
          type="button"
          onClick={handleNativeShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition shadow-xs"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{lang === 'fr' ? 'Partager' : 'Share'}</span>
        </button>
      )}

      {/* WhatsApp */}
      <button
        id="share-whatsapp-btn"
        type="button"
        onClick={handleWhatsAppShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-xs"
        title="Partager sur WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </button>

      {/* X / Twitter */}
      <button
        id="share-twitter-btn"
        type="button"
        onClick={handleTwitterShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-black text-white transition shadow-xs"
        title="Partager sur X (Twitter)"
      >
        <Twitter className="w-3.5 h-3.5" />
        <span>X</span>
      </button>

      {/* Facebook */}
      <button
        id="share-facebook-btn"
        type="button"
        onClick={handleFacebookShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition shadow-xs"
        title="Partager sur Facebook"
      >
        <span className="font-serif font-black text-xs">f</span>
        <span>Facebook</span>
      </button>

      {/* Copy link */}
      <button
        id="share-copy-btn"
        type="button"
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
          copied
            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
        }`}
        title={lang === 'fr' ? 'Copier le lien' : 'Copy link'}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'fr' ? 'Lien copié !' : 'Link copied!'}</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-stone-500" />
            <span>{lang === 'fr' ? 'Copier le lien' : 'Copy link'}</span>
          </>
        )}
      </button>

      {/* Print */}
      <button
        id="share-print-btn"
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition border border-stone-200 ml-auto no-print"
        title={lang === 'fr' ? 'Imprimer la fiche recette' : 'Print recipe card'}
      >
        <Printer className="w-3.5 h-3.5" />
        <span>{lang === 'fr' ? 'Imprimer' : 'Print'}</span>
      </button>
    </div>
  );
}
