# 几何前沿日报 · 2026-09-02

完整收录：55 / 55。AI 协作明确披露 2 篇。

> 自动生成的阅读指南，关键结论请回查原论文。

## 当日总览

### 主要方向与技术进展

- 本期共收录 55 篇，研究重心集中在度量测度几何、极限与奇异空间（13 篇）、几何分析、几何 PDE 与几何流（12 篇）、几何拓扑、低维流形与结（9 篇）。
- 技术路径以完全非线性曲率方程（2 篇）、凹性不等式、半凸约化、伴随函子为主；进展形态主要是新定理/分类（12 篇）、推广/加强（8 篇）。

### 可能的突破点

- **Removability of non-isolated singularities for Einstein metrics and RCD spaces：** 统一低正则延拓、四维 Einstein 光滑化和高维 RCD 正则结构，并推出 Schoen 标量曲率奇点猜想的一类情形。
- **Stability of the Riemannian positive mass theorem for spin manifolds：** 当 ADM 质量趋零时，切除边界面积趋零区域后得到到欧氏空间的 pointed measured GH 收敛。
- **Gromov-Hausdorff Stability and Rigidity of manifolds via Heisenberg-Pauli-Weyl Uncertainty Principle：** 同时覆盖负截面曲率与非负 Ricci 曲率并给出定量模型距离控制，指出 AVR 版本的非最优性。

### 需谨慎处

- 其中 55 篇仅完成摘要级分析；技术细节、定理假设和适用范围需回查正文。
- 《Removability of non-isolated singularities for Einstein metrics and RCD spaces》：余维阈值、L∞ 有界性及接近光滑背景等假设关键。
- 《Stability of the Riemannian positive mass theorem for spin manifolds》：依赖自旋和非负标量曲率，并允许切除小边界区域。

## 全部论文

## 未见 AI 协作声明

## 曲率与比较几何

### Stability of the Riemannian positive mass theorem for spin manifolds

- **作者：** Yiyue Zhang
- **arXiv：** [2609\.01540](https://arxiv.org/abs/2609.01540) · [PDF](https://arxiv.org/pdf/2609.01540)
- **分类：** math\.DG
- **进展类型：** 推广/加强
- **阅读优先级：** 92/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

把 Riemannian 正质量定理的 Dong--Song 稳定性推广到高维渐近平坦自旋流形。

**使用技术**

- 自旋子方法
- 全局极小图坐标
- 测度 Gromov--Hausdorff 收敛

**可能的突破**

当 ADM 质量趋零时，切除边界面积趋零区域后得到到欧氏空间的 pointed measured GH 收敛。

**限制与不确定性**

依赖自旋和非负标量曲率，并允许切除小边界区域。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 92/100。

**原始英文摘要**

We extend the Dong-Song stability theorem for the Riemannian positive mass theorem to higher dimensional spin manifolds\. More precisely, for a sequence of complete asymptotically flat spin n-manifolds with nonnegative scalar curvature and ADM masses tending to zero, the exterior regions obtained by excising domains whose boundary areas tend to zero converge to Euclidean space in the pointed measured Gromov-Hausdorff topology\. The proof constructs coordinates from globally minimal graphs and controls the metric defect by spinors\.

---

### Gromov-Hausdorff Stability and Rigidity of manifolds via Heisenberg-Pauli-Weyl Uncertainty Principle

- **作者：** Mousomi Bhakta、Debdip Ganguly、Debabrata Karmakar
- **arXiv：** [2609\.01463](https://arxiv.org/abs/2609.01463) · [PDF](https://arxiv.org/pdf/2609.01463)
- **分类：** math\.DG、math\.AP
- **进展类型：** 定量刚性
- **阅读优先级：** 90/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

用 Heisenberg--Pauli--Weyl 不等式亏量研究流形到欧氏或双曲模型的 Gromov--Hausdorff 稳定性。

**使用技术**

- 不确定性不等式
- pointed GH 收敛
- 曲率修正亏量

**可能的突破**

同时覆盖负截面曲率与非负 Ricci 曲率并给出定量模型距离控制，指出 AVR 版本的非最优性。

**限制与不确定性**

非负 Ricci 情形允许由矩项决定的尺度重标；常数最优性需查正文。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 90/100。

**原始英文摘要**

The classical Heisenberg Pauli Weyl \(HPW\) inequality exhibits a strong rigidity phenomenon on Riemannian manifolds i\.e\. on Cartan Hadamard manifolds and those with non-negative Ricci curvature, the validity of the Euclidean HPW inequality or the existence of extremizers strictly forces the manifold to be isometric to Euclidean space, $\\mathbb\{R\}^n$\. This geometric discrepancy motivates the study of curvature dependent corrections and their associated stability properties\. In this article, we investigate the geometric stability of the HPW inequality\. Specifically, given a sequence of pointed Riemannian manifolds and appropriately normalized functions with a vanishing HPW deficit, we address whether the sequence converges to the corresponding model space in the pointed Gromov Hausdorff topology\. We prove that for pinched Cartan Hadamard manifolds with sectional curvature bounded above by $c &lt; 0$, the manifolds converge to the model hyperbolic space $\\mathbb\{H\}^n\_c$\. In the non-negative Ricci curvature setting, we establish convergence to $\\mathbb\{R\}^n$, up to a metric rescaling factor governed by the sequence's moment term\. Consequently, we deduce that the known HPW inequality formulated via the asymptotic volume ratio \(AVR\) is suboptimal for non negatively Ricci curved manifolds not isometric to Euclidean space\. To resolve this, we introduce a curvature corrected HPW inequality for this setting, analogous to the Cartan Hadamard case\. Finally, we establish quantitative rigidity estimates in both curvature regimes, demonstrating that the HPW deficit when evaluated at Gaussian profiles which explicitly controls an appropriately defined distance to the respective model space\.

---

### The lower mean curvature bound in Gromov's mean-of-the-mean-curvature conjecture

- **作者：** Christian Baer
- **arXiv：** [2609\.01189](https://arxiv.org/abs/2609.01189) · [PDF](https://arxiv.org/pdf/2609.01189)
- **分类：** math\.DG
- **进展类型：** 新定理/反例
- **阅读优先级：** 86/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

分析 Gromov mean-of-the-mean-curvature 猜想中边界平均曲率下界是否必要。

**使用技术**

- 总平均曲率估计
- Gauss 曲率比较
- 高维反例构造

**可能的突破**

二维完全去除额外边界下界并确认猜想；同时证明三维及以上该假设确实不可缺。

**限制与不确定性**

正面结论只在二维，高维得到的是必要性反例而非一般上界。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 86/100。

**原始英文摘要**

Gromov conjectured that for a compact Riemannian manifold $X$ with boundary, the total mean curvature $\\int\_\{\\partial X\} H$ is bounded above by a constant depending only on the intrinsic geometry of $\\partial X$ and a lower bound on the scalar curvature of $X$\. Previous results towards this conjecture require, in addition, a lower bound on the mean curvature of the boundary\. In the present paper, we investigate whether this extra assumption is necessary\. In dimension $2$, we show that no lower bound on the geodesic curvature is needed\. We estimate the total geodesic curvature of the boundary in terms of its length and a lower bound for the Gauss curvature of the surface\. This confirms Gromov's conjecture in $2$~dimensions without any extra assumptions\. In contrast, we give examples showing that a lower bound on the mean curvature is genuinely needed in dimensions $n \\ge 3$\.

---

### On Embedding Hamming Spheres with Applications to Positive Curvature

- **作者：** Muhammad Abdullah
- **arXiv：** [2609\.00483](https://arxiv.org/abs/2609.00483) · [PDF](https://arxiv.org/pdf/2609.00483)
- **分类：** math\.DG
- **进展类型：** 推广/加强
- **阅读优先级：** 84/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

研究正曲率闭流形上的有限素数环面作用，得到同伦分类并加强半最大对称秩结果。

**使用技术**

- 对称秩方法
- Hamming 球嵌入
- 正截面曲率

**可能的突破**

把 Wilking 的二元球嵌入构造推广到任意素数，为正曲率对称性分类提供新工具。

**限制与不确定性**

需要闭流形、正截面曲率和特定有限群作用。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 84/100。

**原始英文摘要**

We consider isometric $\\mathbb\{Z\}\_\{p\}$-torus actions on closed, positively curved manifolds, obtaining a homotopy classification result\. This allows us to strengthen on the improvement of the $3n/8$ half-maximal symmetry rank result of Fang-Rong and Ghazawneh given in Theorem B and Corollary C in the work of the author and Searle\. Along the way, we generalize a sphere-embedding construction of Wilking from the binary case to arbitrary primes in Theorem C, which is a geometric construction of independent interest\.

---

### Rigidity of Euclidean Minimal Hypersurfaces under Nonuniform Diagonal Dilations

- **作者：** Jongha Lee、Suhwan Lee、Jae Won Lee
- **arXiv：** [2609\.00668](https://arxiv.org/abs/2609.00668) · [PDF](https://arxiv.org/pdf/2609.00668)
- **分类：** math\.DG
- **进展类型：** 刚性定理
- **阅读优先级：** 75/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

证明在权重对和非共振时，有限多个非均匀对角伸缩后仍极小的欧氏超曲面必须是仿射超平面。

**使用技术**

- 极小超曲面方程
- 非共振消元
- 维数约化

**可能的突破**

只需有限个伸缩参数即可推出第二基本形式消失，并用共振例子说明假设边界。

**限制与不确定性**

刚性依赖 pair-sum 非共振；重复权重下存在 helicoidal 和二次锥反例。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 75/100。

**原始英文摘要**

Let $n\\ge3$ and $D\_t=\\operatorname\{diag\}\(t^\{g\_1\},\\ldots,t^\{g\_n\}\)$ be a positive diagonal dilation family\. We study connected embedded Euclidean hypersurfaces whose diagonal images are minimal\. The level-set minimality operator splits into coefficients indexed by the pair sums $g\_i\+g\_j$\. Under pair-sum nonresonance, minimality at only $\\binom n2$ distinct dilation parameters forces all pair coefficients to vanish\. A dimension-reduction argument then shows, without any hypothesis on the coordinate components of the normal, that the second fundamental form vanishes identically\. This yields an affine characterization\. Repeated-weight helicoidal examples in every dimension and a resonant quadratic cone show that curvature cancellation can survive in genuinely nonuniform families\. An application gives a finite-output-level rigidity criterion and an explicit representation for weighted-homogeneous production functions with minimal isoquants\.

---

## 度量测度几何、极限与奇异空间

### Removability of non-isolated singularities for Einstein metrics and RCD spaces

- **作者：** Gioacchino Antonelli、Gábor Székelyhidi
- **arXiv：** [2609\.01464](https://arxiv.org/abs/2609.01464) · [PDF](https://arxiv.org/pdf/2609.01464)
- **分类：** math\.DG、math\.MG
- **进展类型：** 新定理/分类
- **阅读优先级：** 94/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

建立 Einstein 度量和 Ricci 下界度量的非孤立奇点可去性定理，并连接到 RCD 延拓。

**使用技术**

- RCD 理论
- 可去奇点分析
- 非塌缩正则集

**可能的突破**

统一低正则延拓、四维 Einstein 光滑化和高维 RCD 正则结构，并推出 Schoen 标量曲率奇点猜想的一类情形。

**限制与不确定性**

余维阈值、L∞ 有界性及接近光滑背景等假设关键。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 94/100。

**原始英文摘要**

In this paper we establish removable singularities results for Einstein metrics and for metrics with Ricci curvature bounded below\. Let $n\\geq 2$\. On a closed $n$-manifold, we show that an $L^\\infty$-Riemannian metric whose Ricci curvature is bounded below outside a singular set of codimension $&gt; 3- \\frac\{1\}\{n-1\}$ canonically extends to an $\\mathrm\{RCD\}$ space\. As a consequence, using a new removable singularity theorem for Einstein metrics, we prove that in dimension $4$ any Einstein metric with $L^\\infty$ singularities of codimension $&gt;3-\\frac\{1\}\{3\}$ extends smoothly across the singular set, possibly after changing the smooth structure\. In higher dimensions, we construct a $C^\{1,α\}$-Riemannian manifold structure on the regular set of a non-collapsed $\\mathrm\{RCD\}$ space that is a Riemannian manifold with bounded $\|\\mathrm\{Ric\}\|$ outside a set of codimension $&gt;2$\. Our results can be used to give a proof of Schoen's conjecture on scalar curvature singularities for metrics that are either continuous, or $L^\\infty$ and sufficiently close to a smooth background metric\.

---

### The Truncated Octahedral Conjecture

- **作者：** Thomas Hales、Lark Song
- **arXiv：** [2609\.00997](https://arxiv.org/abs/2609.00997) · [PDF](https://arxiv.org/pdf/2609.00997)
- **分类：** math\.MG
- **进展类型：** 解决猜想
- **阅读优先级：** 78/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

证明固定体积三维平行多面体中，阿基米德截角八面体唯一最小化表面积。

**使用技术**

- 凸多面体几何
- 标量不等式
- 严格计算机辅助证书

**可能的突破**

解决 Bezdek 2006 年提出的截角八面体猜想，并给出精确可核验计算证书。

**限制与不确定性**

最终关键标量不等式依赖计算机辅助验证，需检查证书与唯一性边界。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 78/100。

**原始英文摘要**

Among three-dimensional parallelohedra of fixed volume, the Archimedean truncated octahedron uniquely minimizes surface area, affirming a conjecture of K\. Bezdek from 2006\. The final scalar inequality is verified by an exact computer-assisted certificate\.

---

### An exact hierarchy for Lebesgue's universal covering constant and a certified 0\.834 lower bound

- **作者：** Shuai Zeng
- **arXiv：** [2609\.01284](https://arxiv.org/abs/2609.01284) · [PDF](https://arxiv.org/pdf/2609.01284)
- **分类：** math\.MG
- **进展类型：** 新方法/加强
- **阅读优先级：** 78/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

为 Lebesgue 通用覆盖常数建立精确有限弧变分层级，并给出认证下界 0\.834。

**使用技术**

- Reuleaux 型变分
- 有限维逼近
- 区间计算证书

**可能的突破**

证明层级以二阶速度收敛并改进保持二十余年的下界基准。

**限制与不确定性**

主要解决平面凸几何常数，认证下界依赖严格计算。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 78/100。

**原始英文摘要**

Posed by Lebesgue in 1914, the universal covering problem asks for the smallest-area planar convex set containing a congruent copy of every set of diameter at most one\. We introduce an exact Reuleaux-type variational hierarchy for this constant: its monotone finite-arc values $Λ\_M$ satisfy $a\_\{\\mathrm\{Leb\}\}=\\lim\_\{M\\to\\infty\}Λ\_M$, and each level is a continuous finite-dimensional problem\. We prove $0\\le a\_\{\\mathrm\{Leb\}\}-Λ\_M\\le C M^\{-2\}$, giving a controlled finite-arc route to the constant itself\. As a certified low-order realization, an outward-rounded interval certificate for a regular finite Reuleaux subtest proves $a\_\{\\mathrm\{Leb\}\}\\ge0\.834$, improving the lower-bound benchmark established by Brass and Sharifi in 2005\.

---

### On cost-induced Santaló-type inequalities in Polish measure spaces

- **作者：** Dylan Langharst、Andreas Malliaris、Michael Roysdon
- **arXiv：** [2609\.01460](https://arxiv.org/abs/2609.01460) · [PDF](https://arxiv.org/pdf/2609.01460)
- **分类：** math\.FA、math\.MG
- **进展类型：** 新框架/推广
- **阅读优先级：** 77/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

在由连续成本耦合的 Polish 测度空间上建立 cost-Santaló 函数不等式框架。

**使用技术**

- 传递原理
- 对数凹等周函数
- 最优输运

**可能的突破**

统一并扩展多类 Santaló 不等式，覆盖矩阵空间、RCD\(K,∞\)、Hamming cube 和输运熵应用。

**限制与不确定性**

具体几何后果依赖抽象成本结构及相应极集不等式。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 77/100。

**原始英文摘要**

We introduce a framework for establishing Blaschke-Santaló-type inequalities on $m$-tuples of Polish measure spaces coupled together by a continuous cost function\. Central to our approach is a transference principle, which provides a mechanism to lift geometric weighted inequalities involving cost-polar sets into functional integral inequalities of Santaló-type\. We call these equivalent inequalities cost-Santaló inequalities\. This definition expands and includes previous notions in the literature\. We apply this principle to deduce several new versions of functional Santaló inequalities, including on the space of rectangular matrices and a functional sine Santaló inequality\. A surprising development is that probability spaces with log-concave isoperimetric functions fit into our framework, for example, Gauss space and spherical space, leading to new functional Santaló inequalities in these settings\. In particular, we obtain results for $\\operatorname\{RCD\}\(K,\\infty\)$ spaces\. As a discrete application, we obtain an inequality for the Hamming cube\. Finally, we explore applications to optimal transport, utilizing our functional framework to establish generalized transport-entropy inequalities on arbitrary Polish spaces satisfying a cost-Santaló inequality, which we explicitly instantiate for matrix spaces\.

---

### Rectifiability of the Singular Strata for Harmonic Maps to DM-Complexes

- **作者：** Ivy Stoner、Yitong Sun
- **arXiv：** [2609\.00183](https://arxiv.org/abs/2609.00183) · [PDF](https://arxiv.org/pdf/2609.00183)
- **分类：** math\.DG
- **进展类型：** 推广/加强
- **阅读优先级：** 76/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

证明从黎曼域到非正曲率 DM-complex 的调和映射各阶奇异层均为可数可整流集。

**使用技术**

- 调和映射正则性
- 奇异集分层
- 可整流性框架

**可能的突破**

把针对 F-connected complexes 的奇异层可整流结果推广到更一般的 DM-complex 目标。

**限制与不确定性**

证明沿用既有分层框架，创新主要体现在目标空间适用范围。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 76/100。

**原始英文摘要**

We prove a rectifiability theorem for harmonic maps into DM-complexes\. More specifically, if $u$ is a harmonic map from a $n$-dimensional Riemannian domain to an $N$-dimensional NPC DM-complex $Y$, the $k$-th singular stratum of the singular set is countably $k$-rectifiable for all $k \\in \\\{0,\.\.\.,n-2\\\}\.$ Our proof follows the framework in \\cite\{dm\}\. This extends the rectifiability result for the singular set of harmonic maps into a $F$-connected complex in \\cite\{dees\} and generalizes the rectifiability theorem with respect the singular strata of harmonic maps into a $F$-connected complex in \\cite\{bd\}\.

---

### A threshold phenomenon for embeddings of Euclidean snowflakes and impossibility of dimension reduction

- **作者：** Assaf Naor、Kevin Ren
- **arXiv：** [2609\.01079](https://arxiv.org/abs/2609.01079) · [PDF](https://arxiv.org/pdf/2609.01079)
- **分类：** math\.MG
- **进展类型：** 尖锐阈值
- **阅读优先级：** 74/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

确定欧氏 snowflake 嵌入 ℓp 时线性维数约化与超线性维数障碍之间的尖锐阈值。

**使用技术**

- 度量嵌入
- snowflake 变换
- 维数下界

**可能的突破**

阈值 p=2/θ 两侧给出匹配到低阶因子的上、下界，并推出 ℓp 中 Johnson--Lindenstrauss 型降维失败。

**限制与不确定性**

核心对象是 Banach 空间有限度量嵌入，与 Ricci 型非光滑几何联系间接。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 74/100。

**原始英文摘要**

Fix $0&lt;θ\\leqslant 1$\. We prove that if $1\\leqslant p \\leqslant 2/θ$, then the $θ$-snowflake of $\\ell\_2^k$, namely, $\\mathbb\{R\}^k$ equipped with the metric $\(\(x,y\)\\in \\mathbb\{R\}^k\\times \\mathbb\{R\}^k\)\\mapsto \\\|x-y\\\|\_2^θ$, embeds with distortion $O\(1\)$ into $\\ell\_p^m$ for some integer $m\\lesssim\_\{p,θ\}k$, which is optimal as $k\\to \\infty$, as seen by comparing dimensions\. However, for $p$ larger than the sharp threshold $2/θ$ the following change in behavior occurs: If a $\(1/\\sqrt\{k\}\)$-dense subset of the Euclidean sphere $S^\{k-1\}$ embeds into $\\ell\_p^m$ with distortion $O\(1\)$, then necessarily $m\\gtrsim\_\{p,θ\}\( k/\\log k\)^\{pθ/2\}$, which grows super-linearly in $k$ as $pθ/2&gt;1$, and this dimension bound is optimal as $k\\to \\infty$ up to lower order factors\. We deduce from this statement that if $2&lt;p&lt;\\infty$, then there exist arbitrarily large $n$-point subsets of $\\ell\_p$ with the property that if they embed with distortion $O\(1\)$ into $\\ell\_p^m$, then necessarily $m\\gtrsim\_p \(\(\\log n\)/\(\\log\\log n\)^2\)^\{p/2\}$, thus demonstrating that the statement of the Johnson--Lindenstrauss dimension reduction lemma fails to hold for $\\ell\_p$

---

### Pushforward dynamics on Wasserstein spaces and measure rigidity

- **作者：** Douglas Finamore、André Magalhães de Sá Gomes、Christian S\. Rodrigues
- **arXiv：** [2609\.00451](https://arxiv.org/abs/2609.00451) · [PDF](https://arxiv.org/pdf/2609.00451)
- **分类：** math\.DS、math\.DG、math\.PR
- **进展类型：** 新方法/反例
- **阅读优先级：** 70/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

计算流形自映射在 Wasserstein 空间上的推前作用导数，并研究不变测度的一阶变形。

**使用技术**

- Wasserstein 切空间
- transfer/Koopman 算子
- 测度刚性

**可能的突破**

在环面例子中构造任意维近似共同不变测度族，证明相关刚性若成立必是非线性现象。

**限制与不确定性**

可微性结论要求覆盖映射和正的光滑密度；反例是一阶层面的失效。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 70/100。

**原始英文摘要**

For an endomorphism $φ$ of a closed Riemannian manifold $M$, we study the pushforward action $φ\_\\ast$ on the Wasserstein space $\\mathcal\{P\}\(M\)$ at a measure $μ\_0$ preserved by $φ$\. We show that if $φ$ is a $C^2$ covering map and $μ\_0$ has positive $C^1$ density, then $φ\_\\ast$ is Gâteaux differentiable at $μ\_0$ along tangent directions, with derivative given by the transfer operator of $φ$ acting on vector fields, followed by orthogonal projection onto the tangent space\. The derivative is the adjoint of the Koopman operator restricted to the tangent space, and its fixed space consists of the directions in which $μ\_0$ can be deformed while preserving invariance to first order\. For appropriate pairs of endomorphisms of $\\mathbb\{T\}^d$, we compute the intersection of their fixed spaces, show that it contains an infinite family of linearly independent continuous vector fields, and construct, for every $n$, an embedded $n$-dimensional family of measures that are nearly invariant under both endomorphisms\. First-order rigidity therefore fails in every dimension\. In particular, rigidity phenomena such as higher-dimensional analogues of the Furstenberg conjecture, if true, are genuinely nonlinear\.

---

### The Discrete Harmonic Center of a Quadrilateral

- **作者：** Marc Alexa
- **arXiv：** [2609\.00917](https://arxiv.org/abs/2609.00917) · [PDF](https://arxiv.org/pdf/2609.00917)
- **分类：** math\.DG、cs\.CG、math\.CV、math\.MG
- **进展类型：** 新方法/构造
- **阅读优先级：** 60/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

定义四边形的离散调和中心：插入点使分片线性 Dirichlet 能量最小，且位置与顶点数据无关。

**使用技术**

- 离散 Dirichlet 能量
- 凸性
- Möbius 对合

**可能的突破**

证明中心具有 Möbius 协变性，并推广到具有 d\+2 个顶点的 d 维多面体。

**限制与不确定性**

共形刻画是二维四边形特有，和一般度量空间理论联系有限。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 60/100。

**原始英文摘要**

Triangulate a simple quadrilateral by connecting all vertices to an additional point\. If the vertices carry values, the piecewise linear function can be assigned a Dirichlet energy\. We show that the minimal Dirichlet energy as a function of the location of the inserted point is convex, and the location of the minimum is independent of the values at the corners - a quadrilateral has a discrete harmonic center, characterized by an equilibrium of currents across the inserted edges\. It turns out that the fixed points of the Möbius involution swapping opposite corners of the quadrilateral are critical points of this energy, so the discrete harmonic center is Möbius-covariant\. For tangential and cyclic quadrilaterals the center admits simple closed forms related to the circle centers\. The center and its data-independence generalize to polytopes with d \+ 2 vertices in dimension d, but the conformal characterizations are special to four points in the plane\.

---

### The Discrete $L\_p$ Minkowski Problem for Negative $p$

- **作者：** Junjie Shan
- **arXiv：** [2609\.01429](https://arxiv.org/abs/2609.01429) · [PDF](https://arxiv.org/pdf/2609.01429)
- **分类：** math\.MG、math\.CA
- **进展类型：** 新定理/分类
- **阅读优先级：** 60/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

为所有负 p 的离散 Lp Minkowski 问题建立同调存在性判据。

**使用技术**

- 离散凸几何
- 同调判据
- centro-affine Minkowski 问题

**可能的突破**

对反对称支撑离散测度给出任意正质量的完整存在刻画，并在偶情形得到原点对称解。

**限制与不确定性**

结果针对离散测度，连续测度和正则性问题不在摘要范围内。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 60/100。

**原始英文摘要**

In this paper, we establish a homological existence criterion for the discrete $L\_p$ Minkowski problem for all $p&lt;0$, where $p=-n$ corresponds to the celebrated centro-affine case\. For discrete measures with antipodal support, we obtain a complete existence characterization for arbitrary positive masses\. In the even case, a solution can be chosen origin-symmetric\.

---

### A Projection Identity for Simplices Sharp Inequalities, Converse Results, and Affine Projections

- **作者：** Quang Hung Tran
- **arXiv：** [2609\.01226](https://arxiv.org/abs/2609.01226) · [PDF](https://arxiv.org/pdf/2609.01226)
- **分类：** math\.MG
- **进展类型：** 尖锐不等式
- **阅读优先级：** 57/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

建立单纯形单位边方向 frame operator 的投影恒等式，并导出距离不等式、等号情形和逆刻画。

**使用技术**

- frame operator
- Gram 矩阵谱
- Ky Fan 原理

**可能的突破**

确定迫使单纯形正交所需投影子空间的最小数目，并给出最优定量估计。

**限制与不确定性**

聚焦有限维欧氏单纯形，适用范围较专门。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 57/100。

**原始英文摘要**

We study a projection identity for a simplex in Euclidean space, written in terms of the frame operator of its unit edge directions\. For a right simplex, the identity leads to a sharp family of distance inequalities and a complete description of equality\. For a general simplex, the same formula is controlled by the spectrum of the Gram matrix through the Ky Fan principle\. We prove converse results that characterise right simplices and determine the smallest number of projection subspaces needed to force orthogonality, together with an optimal quantitative estimate\. We also treat affine projection subspaces and show how the original inequality for mutually perpendicular vectors fits into the same framework\.

---

### Flip-graph non-convexity for once-punctured polygons

- **作者：** Lionel Pournin、Zili Wang
- **arXiv：** [2609\.01412](https://arxiv.org/abs/2609.01412) · [PDF](https://arxiv.org/pdf/2609.01412)
- **分类：** math\.MG、math\.CO
- **进展类型：** 反例/分类
- **阅读优先级：** 55/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

解决一次穿孔多边形 flip-graph 中固定弧子图强凸性是否失效的最后开放情形。

**使用技术**

- 三维三角剖分分解
- flip graph
- 双曲体积

**可能的突破**

证明凸多边形可放置单个穿孔使强凸性失败，并推广到单反角简单多边形。

**限制与不确定性**

属于组合几何中的专门非凸性现象。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 55/100。

**原始英文摘要**

The set of the triangulations with vertex set $X$ of a simple polygon $\\mathrm\{P\}$ can be structured into a flip-graph $\\mathcal\{F\}\(\\mathrm\{P\},X\)$ whose edges connect two triangulations that differ by a single arc\. The geometry of flip-graphs has been thoroughly studied and it is known that the subgraph $\\mathcal\{F\}\_\\varepsilon\(\\mathrm\{P\},X\)$ induced by the triangulations that contain a given arc $\\varepsilon$ is strongly convex in $\\mathcal\{F\}\(\\mathrm\{P\},X\)$ when $\\mathrm\{P\}$ is convex and $X$ contains no puncture \(points in the interior of $\\mathrm\{P\}$\) and at most one flat vertex \(points in the interior of an edge\)\. When $X$ contains at least two punctures or flat vertices, it is also known that this strong convexity property fails\. Here, we close the last open case by showing that, for any convex polygon with sufficiently many vertices, one can always place a single puncture in $X$ in such a way that $\\mathcal\{F\}\_\\varepsilon\(\\mathrm\{P\},X\)$ is not strongly convex in $\\mathcal\{F\}\(\\mathrm\{P\},X\)$\. We prove a similar result for simple polygons with a single reflex vertex\. The main ingredients in our proofs are a decomposition lemma for a class of $3$-dimensional triangulations and a hyperbolic volume argument regarding their embedding into $\\mathbb\{H\}^3$\.

---

### Farey Structure in Modulo Krinkle Tilings: Mediant Splicing and Generation of Prototiles from a Single Edge

- **作者：** Mikihiro Fujiwara
- **arXiv：** [2609\.01270](https://arxiv.org/abs/2609.01270) · [PDF](https://arxiv.org/pdf/2609.01270)
- **分类：** math\.CO、math\.MG
- **进展类型：** 新构造
- **阅读优先级：** 45/100 · 低阅读优先级
- **分析深度：** 摘要级分析

**完成的工作**

证明 Modulo Krinkle 非周期螺旋铺砌的原型砖可沿 Farey/Stern--Brocot 结构由单条边递归生成。

**使用技术**

- Farey mediant
- Christoffel words
- fan-twist 拼接

**可能的突破**

给出唯一拼接分解和变体分离定理，把组合标准分解精确实现为等边几何操作。

**限制与不确定性**

针对特定铺砌族，和课题组主要研究方向的直接联系较弱。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 45/100。

本期靠后：贡献集中于专门的非周期铺砌族，技术不易直接迁移到曲率或度量极限问题。

**原始英文摘要**

The Modulo Krinkle tilings of Imura \(arXiv:2506\.07638\) form a family of non-periodic, spiral monohedral tilings parametrized by a reduced fraction $m/k$ and an integer $t\\ge 2$\. We show that the Farey sum \(mediant\) $\(m\_1\+m\_2\)/\(k\_1\+k\_2\)$ of two Farey-adjacent parameters is realized by an exact geometric operation on prototiles: the lower boundary path of the $\(m\_1\+m\_2,k\_1\+k\_2\)$-prototile is obtained by concatenating the parents' lower paths after an edge-length-preserving progressive rotation \(fan-twist\) of their edges\. Conversely, every prototile admits exactly one fan-twist splice decomposition -- no non-adjacent parameters ever splice -- the cut position being $k\_1=m^\{-1\}\\bmod k$, and the recursion descends the Stern-Brocot tree to a single unit edge\. The combinatorial core of the operation is the classical standard factorization of Christoffel words; the contribution here is its exact edge-isometric realization on circular direction systems and the resulting structure theory for the Modulo Krinkle family, including the recently introduced variants: we prove a separation theorem stating that every variant prototile is the common recursively-generated core plus finitely many direction-invariant decoration edges\. As a corollary of Imura's spiral-arm count formula, the two Farey parents are visible in the offset-free tiling itself: the numbers of counterclockwise and clockwise spiral arms are $tk\_1$ and $tk\_2$\.

---

### Box-Delaunay graphs of large chromatic number

- **作者：** István Tomon
- **arXiv：** [2609\.01439](https://arxiv.org/abs/2609.01439) · [PDF](https://arxiv.org/pdf/2609.01439)
- **分类：** math\.CO、math\.MG
- **进展类型：** 新构造
- **阅读优先级：** 43/100 · 低阅读优先级
- **分析深度：** 摘要级分析

**完成的工作**

构造色数达 exp\(Ω\(√log n\)\) 的二维偏序 Hasse 图及平面 box-Delaunay 图。

**使用技术**

- 极值组合构造
- 偏序 Hasse 图
- box-Delaunay 图

**可能的突破**

同时给出小独立数和大色数的定量下界。

**限制与不确定性**

核心是极值组合几何，与度量几何主线关系较弱。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 43/100。

本期靠后：主要是图色数的组合构造，虽以平面几何表述，但与课题组方向联系有限。

**原始英文摘要**

For every $n$, we construct a 2-dimensional $n$-element poset whose Hasse diagram has independence number $n\\exp\(-Ω\(\\sqrt\{\\log n\}\)\)$, and consequently, chromatic number $\\exp\(Ω\(\\sqrt\{\\log n\}\)\)$\. This also yields an $n$-point planar set whose box-Delaunay graph satisfies the same bounds\.

---

## 几何分析、几何 PDE 与几何流

### Kählerity of complete almost-Kähler gradient shrinking Ricci solitons

- **作者：** Junming Xie
- **arXiv：** [2609\.00840](https://arxiv.org/abs/2609.00840) · [PDF](https://arxiv.org/pdf/2609.00840)
- **分类：** math\.DG
- **进展类型：** 新定理/分类
- **阅读优先级：** 89/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

证明任意偶数维完备 almost-Kähler 梯度收缩 Ricci 孤立子必为 Kähler。

**使用技术**

- Ricci 孤立子方程
- almost-Kähler 恒等式
- 完备性分析

**可能的突破**

去除紧致性限制，并结合已有分类完成四维完备 almost-Kähler shrinker 分类。

**限制与不确定性**

四维分类推论仍依赖既有 Kähler--Ricci shrinker 曲面分类。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 89/100。

**原始英文摘要**

In this paper, we prove that any complete, compact or noncompact, almost-Kähler gradient shrinking Ricci soliton is Kähler in arbitrary even dimension\. Among other applications, combining our result with the classification of complete Kähler-Ricci shrinker surfaces, we obtain a full classification of complete almost-Kähler gradient shrinking Ricci solitons in real dimension four\.

---

### Quantitative avoidance for free boundary flows and applications

- **作者：** Yueheng Bao、Robert Haslhofer
- **arXiv：** [2609\.01026](https://arxiv.org/abs/2609.01026) · [PDF](https://arxiv.org/pdf/2609.01026)
- **分类：** math\.DG、math\.AP
- **进展类型：** 新方法/推广
- **阅读优先级：** 88/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

引入自由边界超曲面间的 twisted Fermi distance，并证明其沿自由边界平均曲率流单调。

**使用技术**

- twisted Fermi 距离
- Brakke 流
- 避免原理

**可能的突破**

把自由边界 Brakke 流避免原理及圆柱奇点唯一性从凸域推广到任意域。

**限制与不确定性**

应用仍继承弱 Brakke 流框架及相应局部正则条件。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 88/100。

**原始英文摘要**

In this article, we introduce a new distance function between hypersurfaces with free boundary\. We show that our new quantity, which we call twisted Fermi distance, is monotone under mean curvature flow with free boundary\. This overcomes the stumbling block that monotonicity of the usual distance function can fail for non-convex domains, and has several applications\. Most importantly, we generalize the avoidance principle for free boundary Brakke flows, recently established by the first author for convex domains, to arbitrary domains\. Using this, we then show that all results from our recent joint work, including the mean-convex neighborhood theorem and the uniqueness theorem for free boundary flows through cylindrical singularities, can be generalized to arbitrary domains without any convexity assumptions as well\.

---

### Finite Time Singularities of Collapsing Kähler Ricci Flow on Ruled Surfaces

- **作者：** Tongxin Xu、Zhenlei Zhang
- **arXiv：** [2609\.01442](https://arxiv.org/abs/2609.01442) · [PDF](https://arxiv.org/pdf/2609.01442)
- **分类：** math\.DG
- **进展类型：** 新定理/分类
- **阅读优先级：** 87/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

证明 ruled surface 上任意有限时塌缩 Kähler--Ricci 流均形成 Type I 奇点。

**使用技术**

- Kähler--Ricci 流
- 奇点吹起
- 纤维塌缩估计

**可能的突破**

识别标准 P1×C 乘积 shrinker 为奇点模型，并得到纤维最优塌缩速率。

**限制与不确定性**

结论限定于 ruled surfaces 与有限时塌缩情形。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 87/100。

**原始英文摘要**

We prove that any finite time collapsing Kähler Ricci flow on ruled surfaces develops a Type I singularity, such singularity is modeled on the standard product shrinker $\\mathbb\{P\}^1\\times \\mathbb\{C\}$\. As an application, we obtain the optimal collapse rate of fibers on ruled surfaces\.

---

### Mass Bounds for Confined Area-Minimizing Minimal Surfaces

- **作者：** Xumin Jiang、Jiongduo Xie
- **arXiv：** [2609\.01324](https://arxiv.org/abs/2609.01324) · [PDF](https://arxiv.org/pdf/2609.01324)
- **分类：** math\.DG、math\.AP
- **进展类型：** 解决问题/加强
- **阅读优先级：** 86/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

为几何受限的面积极小整流流建立与余维无关的内部质量上界。

**使用技术**

- 体积倍增
- current squashing
- 局部化质量估计

**可能的突破**

肯定回答 Lin 的内部质量问题，并移除双曲边界正则理论中的双指数质量增长假设。

**限制与不确定性**

仍需 confinement 和代数投影重数控制。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 86/100。

**原始英文摘要**

We establish codimension-independent mass bounds for geometrically confined area-minimizing rectifiable currents\. In Euclidean space, we combine the confined-volume doubling theorem of Colding--Minicozzi with a current-theoretic squashing argument\. This gives an affirmative answer to Lin's interior mass-bound problem for every algebraic projection multiplicity $Q$: the interior mass is bounded by $C\(n\)Q$, without an a priori mass bound at a larger scale\. For the hyperbolic application, we make the curvature modification of the fixed-scale argument needed in a thin tubular neighborhood of a totally geodesic copy of $\\mathbb\{H\}^n$\. Combining this auxiliary estimate with a localized squashing estimate removes the doubly exponential local mass-growth condition from the boundary regularity results in \[13\]\.

---

### Hypersurfaces of constant higher order mean curvature in hyperbolic space with prescribed asymptotic boundary at infinity

- **作者：** Bin Wang
- **arXiv：** [2609\.01565](https://arxiv.org/abs/2609.01565) · [PDF](https://arxiv.org/pdf/2609.01565)
- **分类：** math\.DG、math\.AP
- **进展类型：** 新方法/构造
- **阅读优先级：** 85/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

构造双曲空间中具有指定无穷远渐近边界、常高阶平均曲率的光滑完备超曲面。

**使用技术**

- 半凸约化
- 完全非线性曲率方程
- 凹性不等式

**可能的突破**

以新的半凸化论证覆盖传统凹性工具失效的较大次临界指标区间。

**限制与不确定性**

摘要未给出指标区间端点、边界数据正则性和唯一性。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 85/100。

**原始英文摘要**

In this note, we prove the existence of smooth complete admissible hypersurfaces in hyperbolic space with constant higher order mean curvature and a prescribed asymptotic boundary at infinity\. Unexpectedly, our result holds for a large part of indices in the subcritical range where the concavity inequality loses its effectiveness\. We supply with new arguments to reduce the proof to a semi-convex situation in which case the concavity inequality can play a role\.

---

### The asymptotic Plateau problem for Hypersurfaces of constant $H\_\{k\}$ curvature in hyperbolic space

- **作者：** Xinqun Mei、Jin Yan
- **arXiv：** [2609\.01104](https://arxiv.org/abs/2609.01104) · [PDF](https://arxiv.org/pdf/2609.01104)
- **分类：** math\.DG、math\.AP
- **进展类型：** 推广/加强
- **阅读优先级：** 84/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

证明双曲空间中具有指定无穷远边界的光滑完备 k-凸常 Hk 曲率超曲面存在。

**使用技术**

- 渐近 Plateau 问题
- 完全非线性曲率方程
- k-凸性

**可能的突破**

把 Guan--Spruck 存在定理中的常数范围扩展到完整区间 0&lt;σ&lt;1。

**限制与不确定性**

摘要未说明边界正则性、唯一性及先验估计的完整假设。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 84/100。

**原始英文摘要**

In this paper, we study the asymptotic Plateau problem in hyperbolic space for hypersurfaces of constant $H\_k$-curvature\. We prove the existence of a smooth complete $k$-convex hypersurface in $\\mathbb\{H\}^\{n\+1\}$ satisfying \\\[ H\_k\(κ\)=σ, \\qquad σ\\in\(0,1\), \\\] with prescribed asymptotic boundary at infinity\. In particular, our result extends the range of the constant $σ$ in the existence theorem of Guan and Spruck \[J\. Eur\. Math\. Soc\. 12 \(2010\), no\. 3, 797--817\] for $H\_\{k\}$ curvature to the full interval $\(0,1\)$\.

---

### Uniqueness of Finite-Time Varifold Limits for the Möbius-Invariant Willmore Flow

- **作者：** Mohameden Ahmedou、Ruben Jakob
- **arXiv：** [2609\.00501](https://arxiv.org/abs/2609.00501) · [PDF](https://arxiv.org/pdf/2609.00501)
- **分类：** math\.AP、math\.DG
- **进展类型：** 推广/加强
- **阅读优先级：** 83/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

在统一定量非脐条件下证明 Möbius 不变 Willmore 流有限时几何端点唯一。

**使用技术**

- 内蕴输运估计
- Allard 紧性
- varifold 收敛

**可能的突破**

把子列紧性提升为整条轨道的唯一 varifold 极限，并给出面积测度定量收敛。

**限制与不确定性**

核心结论依赖统一非脐性；无限时间还需有限耗散长度。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 83/100。

**原始英文摘要**

We prove uniqueness of finite-time geometric endpoints for the Möbius-invariant Willmore flow in $\\mathbb\{S\}^3$ under uniform quantitative nonumbilicity\. The multiplicity-counting varifolds converge, without reparametrization or Möbius renormalization, to a unique integral two-varifold\. An intrinsic transport estimate gives quantitative total-variation convergence of the induced area measures on the fixed domain and bounded-Lipschitz Cauchy control of their pushforwards\. Together with Allard compactness and rectifiability, this upgrades subsequential compactness to full-trajectory varifold convergence\. The limit has generalized Euclidean mean curvature in $L^2$ with the natural endpoint lower-semicontinuity bound\. For finite maximal trajectories with initial energy at most $8π$, Jakob's subsequential alternative becomes sequence independent: the limit is zero, or it has unit density and embedded Lipschitz support of genus zero or one\. For Hopf-torus trajectories under the same energy bound, nonumbilicity is automatic and the anchored constant-speed profiles converge weakly in $W^\{2,2\}$ and strongly in $W^\{1,2\}$ and $C^\{1,α\}$ for every $α&lt;\\frac\{1\}\{2\}$\. At infinite time, the same method yields a unique limit under an additional finite-dissipation-length condition\.

---

### Regularity and Rivière's $\{GL\}\(m\)$-Gauge Construction for Elliptic Systems with Antisymmetric Potentials in Arbitrary Dimensions

- **作者：** Carolin Bayer
- **arXiv：** [2609\.00826](https://arxiv.org/abs/2609.00826) · [PDF](https://arxiv.org/pdf/2609.00826)
- **分类：** math\.AP、math\.DG
- **进展类型：** 推广/加强
- **阅读优先级：** 80/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

在任意维临界 Lorentz 空间中证明带反对称势的椭圆系统弱解连续性，并构造 Rivière 型 GL\(m\) gauge。

**使用技术**

- 反对称势
- Lorentz--Sobolev 空间
- 守恒律与 gauge

**可能的突破**

把二维 gauge/守恒律机制推进到高维临界正则性框架。

**限制与不确定性**

势与解需满足特定临界 Lorentz 指数条件。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 80/100。

**原始英文摘要**

Let $1 \\leq q \\le 2$ and denote by $2 \\leq q'$ its corresponding conjugate exponent\. We prove the continuity of solutions $u \\in W^\{1,\(\\frac\{n\}\{n-1\},q'\)\}\(B^n, \\mathbb\{R\}^m\)$ to the critical elliptic system $-Δu = Ω\\cdot \\nabla u$ in dimension $n \\ge 3$, where the potential $Ω\\in L^\{\(n,q\)\}\(B^n, \\mathfrak\{so\}\(m\) \\otimes \\wedge^1\)$ is antisymmetric\. First, we construct $P \\in W^\{1,\(n,q\)\}\(B^n, \\mathrm\{SO\}\(m\)\)$ such that the PDE can be rewritten as $-\\operatorname\{div\}\(P^\{-1\}du\) = \\ast dξ\\cdot P^\{-1\}du$, which is nearly a Jacobian structure up to the rotation $P$\. Second, we provide a Rivière's $\\mathrm\{GL\}\(m\)$-Gauge in order to establish a "full" $\(A,B\)$-conservation law, i\.e\. $-\\operatorname\{div\}\(Adu\)=d^\\ast B \\cdot du\.$

---

### Singular Rotational Self-Similar Tori for Odd $σ\_k$-Curvature Flows

- **作者：** Haoxuan Cheng、Junqi Lai、Guoxin Wei
- **arXiv：** [2609\.01346](https://arxiv.org/abs/2609.01346) · [PDF](https://arxiv.org/pdf/2609.01346)
- **分类：** math\.DG
- **进展类型：** 新构造
- **阅读优先级：** 80/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

对奇数 k 构造 σk 曲率流的紧嵌入旋转自相似环面弱解，并确定其最佳正则性。

**使用技术**

- 奇次幂去奇化
- shooting 法
- 弱形算子

**可能的突破**

证明旋转环面自相似子必损失 C² 正则性，并实现恰到 C1,1/k 的奇异模型。

**限制与不确定性**

构造局限于旋转对称、奇数 k 和 Sobolev 几乎处处意义。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 80/100。

**原始英文摘要**

For every pair of integers $3\\leq k&lt;n$ with $k$ odd, we construct a compact embedded rotational torus in $\\mathbb\{R\}^\{n\+1\}$ whose homothetic dilations satisfy the unnormalised $σ\_k$-curvature flow in a Sobolev almost-everywhere sense\. Its profile curve has Hölder regularity $C^\{1,1/k\}$ and Sobolev regularity $W^\{2,p\}$ for every $1\\leq p&lt;k/\(k-1\)$\. Away from two singular latitudes the torus is smooth; globally, the flow equation is interpreted using the weak shape operator of the associated Lipschitz boundary\. Under rotational symmetry, the self-similar equation $\\langle X,ν\\rangle=-σ\_k$, where $X$ is the position vector and $ν$ is the unit normal, reduces to a degenerate profile system\. We solve this system by combining an odd-power desingularisation, a shooting argument, uniform radial and axial bounds, and a strict gap between the shooting parameters and the cylindrical radius\. No classical $C^2$ rotational torus can satisfy the soliton equation, so the loss of regularity is unavoidable within the rotational toroidal class\.

---

### Boundary asymptotics for two-dimensional vectorial Allen-Cahn systems

- **作者：** Zhiyuan Dai、Haotong Fu、Huaijie Wang、Wei Wang
- **arXiv：** [2609\.00739](https://arxiv.org/abs/2609.00739) · [PDF](https://arxiv.org/pdf/2609.00739)
- **分类：** math\.AP、math\.DG
- **进展类型：** 推广/加强
- **阅读优先级：** 79/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

研究二维向量 Allen--Cahn 临界点在 Neumann 边界附近的能量测度极限与界面结构。

**使用技术**

- 应力能量张量
- 可整流 varifold
- 边界集中分析

**可能的突破**

把平面内部理论延伸到自由边界，允许边界质量并刻画正交相交和投影平衡。

**限制与不确定性**

结论针对二维、有限非退化势阱和有界能量序列。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 79/100。

**原始英文摘要**

We study asymptotic properties of critical points of the two-dimensional vectorial Allen-Cahn energy with finitely many non-degenerate wells, subject to a homogeneous Neumann boundary condition\. For any sequence with uniformly bounded energy, we prove that the limiting full and potential measures are supported on a closed countably 1-rectifiable set up to the boundary and satisfy the discrepancy relations\. The potential measure defines a free-boundary stationary rectifiable varifold\. Boundary mass may occur: weights are constant on regular boundary arcs, finite-type junctions obey projected balance, and the sole non-boundary branch meets the boundary orthogonally\. This provides a Neumann-boundary extension of Bethuel's planar interior theory\. The key idea is to read the boundary geometry from the limiting stress-energy tensor, which identifies the potential-energy measure as the stationary interfacial measure even in the presence of boundary concentration\.

---

### Uniqueness and Stability of Monge--Ampère Potentials in Big Cohomology Classes

- **作者：** Quang-Tuan Dang、Lei Zhang、Bin Zhou
- **arXiv：** [2609\.00810](https://arxiv.org/abs/2609.00810) · [PDF](https://arxiv.org/pdf/2609.00810)
- **分类：** math\.DG
- **进展类型：** 推广/加强
- **阅读优先级：** 72/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

为大上同调类中的退化复 Monge--Ampère 方程建立稳定性和一致连续模估计，并推出小参数平均场方程解的唯一性。

**使用技术**

- 复 Monge--Ampère 方程
- 稳定性估计
- 连续模控制

**可能的突破**

在退化大类中同时获得定量稳定与正则控制，并用于唯一性。

**限制与不确定性**

摘要未列出测度密度和小参数阈值的精确条件。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 72/100。

**原始英文摘要**

In this paper, we establish a stability estimate and a uniform estimate for the modulus of continuity of solutions to the degenerate complex Monge-Ampère equation in big cohomology classes\. Consequently, we prove the uniqueness of solutions to complex Monge-Ampère mean field equations for a sufficiently small parameter\.

---

### Shape Optimization and Bernoulli Free Boundary Problems for the Riemannian $p$-Laplacian

- **作者：** Ababacar Sadikhe Djite、Diaraf Seck
- **arXiv：** [2609\.00571](https://arxiv.org/abs/2609.00571) · [PDF](https://arxiv.org/pdf/2609.00571)
- **分类：** math\.DG
- **进展类型：** 部分结果
- **阅读优先级：** 55/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

把黎曼 p-Laplacian 的外 Bernoulli 自由边界问题写成带体积约束的形状优化，并导出一阶变分和过定边界条件。

**使用技术**

- 形状导数
- Lagrange 乘子
- 自由边界 p-Laplacian

**可能的突破**

在黎曼背景下建立变分框架并得到条件性单调结论。

**限制与不确定性**

最终逐次逼近仍需额外几何和边界通量稳定性假设，完整存在性尚未闭合。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 55/100。

**原始英文摘要**

We study an exterior Bernoulli-type free boundary problem associated with the Riemannian $p$-Laplacian on a compact Riemannian manifold\. Following the shape-optimization strategy of Ly and Seck, we formulate the corresponding volume-constrained shape optimization problem, derive its first shape derivative, obtain the overdetermined Bernoulli condition through a Lagrange multiplier, and establish a conditional monotonicity result under a Riemannian contraction hypothesis\. The final successive-approximation argument will require additional geometric and boundary-flux stability assumptions\.

---

## 黎曼、亚黎曼、Finsler及特殊几何结构

### Lagrangian Foliations on compact Kähler manifolds

- **作者：** Fabio Podestà
- **arXiv：** [2609\.01142](https://arxiv.org/abs/2609.01142) · [PDF](https://arxiv.org/pdf/2609.01142)
- **分类：** math\.DG
- **进展类型：** 刚性定理
- **阅读优先级：** 80/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

证明带有正则 Riemann 叶状结构、且叶片均为 Lagrangian 极小子流形的紧 Kähler 流形必平坦。

**使用技术**

- Lagrangian 叶状结构
- 极小叶片
- Ros 积分公式

**可能的突破**

建立 Ros 积分公式的叶状版本并得到强平坦刚性。

**限制与不确定性**

要求紧致、正则叶状结构以及叶片同时 Lagrangian 和极小。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 80/100。

**原始英文摘要**

We prove that a compact Kähler manifold carrying a regular Riemannian foliation whose leaves are Lagrangian and minimal is flat\. In order to prove this result, we establish a foliated version of an integral formula due to Ros\.

---

### Higgs-Demailly System and Positivity of Higgs Bundles

- **作者：** Liangdi Zhang
- **arXiv：** [2609\.00556](https://arxiv.org/abs/2609.00556) · [PDF](https://arxiv.org/pdf/2609.00556)
- **分类：** math\.DG
- **进展类型：** 新定理/分类
- **阅读优先级：** 78/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

刻画紧 Riemann 曲面上 Higgs bundle 的 H-ampleness 与 Higgs--Demailly 系统终端光滑解的等价性。

**使用技术**

- 先验估计
- Leray--Schauder 度
- Higgs 商层反证

**可能的突破**

补出关键标量下界，并以 Griffiths 正 Hitchin--Simpson 曲率给出独立解析刻画。

**限制与不确定性**

目前基底限于紧 Riemann 曲面。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 78/100。

**原始英文摘要**

We prove that the Higgs-Demailly system on a compact Riemann surface admits a smooth admissible solution at its terminal parameter if and only if the Higgs bundle is H-ample\. This gives an independent analytic characterization of H-ampleness by Griffiths-positive Hitchin-Simpson curvature\. The proof extends the Demailly-Pingali-Murakami approach using a priori estimates and Leray-Schauder degree theory\. The missing scalar lower bound follows from a Higgs-compatible quotient construction: a blow-up sequence produces a nonzero Higgs quotient of nonpositive degree, contradicting H-ampleness\.

---

### The Morse Index, Nullity and Jacobi Fields of Constant-Curvature 2-Spheres in Complex Projective Spaces

- **作者：** Hongbin Cui、Shuping Huang
- **arXiv：** [2609\.00922](https://arxiv.org/abs/2609.00922) · [PDF](https://arxiv.org/pdf/2609.00922)
- **分类：** math\.DG
- **进展类型：** 新定理/分类
- **阅读优先级：** 75/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

精确计算复射影空间中常 Gauss 曲率极小二球的 Morse 指标、法零度和 Jacobi 场。

**使用技术**

- Veronese 序列
- Jacobi 算子
- 射影线性变形

**可能的突破**

给出闭式公式并证明所有法 Jacobi 场均可积为极小二球族。

**限制与不确定性**

对象限于复射影空间中的常曲率极小二球及其全测地扩张。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 75/100。

**原始英文摘要**

We determine the Morse index and normal nullity of minimal immersions $S^2\\to \\mathbb\{C\}P^N$ with constant Gauss curvature\. For integers $n\\ge1$ and $k\\in\\\{0,\\ldots,n\\\}$, the member $φ\_\{n-2k,n\}:S^2 \\to \\mathbb\{C\}P^n$ of the Veronese sequence satisfies \\\[ \\operatorname\{Ind\}\(φ\_\{n-2k,n\}\)=2k\(n-k\)\(n\+1\),\\qquad \\operatorname\{Nul\}\(φ\_\{n-2k,n\}\)=2\(n-1\)\(n\+3\)\. \\\] We also obtain the corresponding formulas for its totally geodesic extensions to $\\mathbb\{C\}P^N$, $N\\ge n$, and identify the normal Jacobi kernel with infinitesimal deformations obtained by post-composing the rational normal directrix with projective linear embeddings into $\\mathbb\{C\}P^N$\. In particular, every normal Jacobi field is integrable through a family of minimal $2$-spheres\.

---

### New extremal Kähler metrics on projective bundles

- **作者：** Simon Jubert
- **arXiv：** [2609\.01094](https://arxiv.org/abs/2609.01094) · [PDF](https://arxiv.org/pdf/2609.01094)
- **分类：** math\.DG
- **进展类型：** 新定理/构造
- **阅读优先级：** 75/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

刻画曲线上分裂稳定向量丛的射影化何时存在 Calabi 极值 Kähler 度量，并构造新的 Calabi dream 流形。

**使用技术**

- Yau--Tian--Donaldson 对应
- 矩多面体
- 二阶线性 PDE

**可能的突破**

把四阶极值 Kähler 问题等价转化为 involutive 型 almost-Kähler 度量的二阶线性问题。

**限制与不确定性**

基底限于紧复曲线且向量丛须分解为稳定直和；dream 结论针对秩四和特定曲线。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 75/100。

**原始英文摘要**

Consider a holomorphic vector bundle $E$ over a compact complex curve $C$ which decomposes as a sum of stable vector bundles\. For the projectivization $\\mathbb\{P\}\(E\)$, we prove that the existence of a compatible extremal almost Kähler \(aK\) metric of involutive type in the sense of Lejmi is equivalent to the existence of a Calabi extremal Kähler metric\. This result rests on the Yau--Tian--Donaldson correspondence in terms of the moment polytope $Δ$ for $\\mathbb\{P\}\(E\)$, proved by the author and Yin in a previous work\. The main advantage is that compatible extremal aK metrics of involutive type are solutions to a second-order linear PDE, rather than a fourth-order nonlinear PDE for Calabi's extremal Kähler metrics\. As an application, we prove that when $E$ has rank $4$ and $C$ is an elliptic curve or the projective line, $\\mathbb\{P\}\(E\)$ is a Calabi dream manifold, i\.e\. admits an extremal Kähler metric in every Kähler class\.

---

### On the geometry and cohomology of almost abelian solvmanifolds

- **作者：** Mauro de Andrade Pinto、Letícia Camponês do Brasil Maia、Leonardo F\. Cavenaghi、Pedro Antonio Muniz Martins
- **arXiv：** [2609\.00254](https://arxiv.org/abs/2609.00254) · [PDF](https://arxiv.org/pdf/2609.00254)
- **分类：** math\.DG、math\.SG
- **进展类型：** 新定理/分类
- **阅读优先级：** 63/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

分类几乎阿贝尔 Lie 群及其 solvmanifold 上的左不变广义复结构，并计算相应广义 Dolbeault 上同调。

**使用技术**

- 几乎阿贝尔 Lie 代数
- 谱与 Jordan 数据
- 广义复几何

**可能的突破**

以结构矩阵谱统一刻画可出现的类型、广义 Calabi--Yau 条件和六维非极端结构。

**限制与不确定性**

完整分类主要依赖可对角化情形，非对角化部分只给上界和低维结果。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 63/100。

**原始英文摘要**

We study left-invariant generalized complex structures on almost abelian Lie groups $G\_A = \\mathbb\{R\} \\ltimes\_\{e^\{tA\}\} \\mathbb\{R\}^\{d\}$, and on the associated solvmanifolds\. Our starting point is that the $\\mathbf\{i\}$-eigenspace $\\mathfrak\{L\}$ of such a structure is itself an almost abelian complex Lie algebra, a fact that governs everything that follows\. When the structure matrix $A$ is diagonalizable over $\\mathbb R$, we classify the types that occur in terms of the spectrum of $A$: they are prescribed by pairs of identical eigenvalues, pairs of opposite eigenvalues, and one remaining eigenvalue, the extremal types recovering the known classification of left-invariant complex and symplectic structures\. We characterize the generalized Calabi--Yau case by a single linear condition on the eigenvalues, exhibit groups admitting only structures of intermediate type, and prove that admissible types come in adjacent pairs\. Beyond the diagonalizable case we give an upper bound for the type in terms of the Jordan data of $A$, in dimension $6$, classify \(non-extremal\) left-invariant generalized complex structures, the first dimension in which these can occur\. Finally, we compute the generalized Dolbeault cohomologies of the classified structures: it is given by a closed counting formula over sub-multisets of that spectrum, together with a duality in the grading\.

---

### On a construction of hermitian metrics on holomorphic vector bundles

- **作者：** Laszlo Lempert
- **arXiv：** [2609\.00326](https://arxiv.org/abs/2609.00326) · [PDF](https://arxiv.org/pdf/2609.00326)
- **分类：** math\.CV、math\.AG、math\.DG
- **进展类型：** 否定性结果
- **阅读优先级：** 55/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

研究 Griffiths 正性猜想中的度量构造，证明不能从射影丛线丛的正曲率度量经纤维逐点且函子性的方式得到向量丛正度量。

**使用技术**

- Hermitian 向量丛
- 曲率正性
- 函子性障碍

**可能的突破**

排除了一类看似自然的纤维化证明策略，为 Griffiths 猜想限定了可能方法。

**限制与不确定性**

不否定 Griffiths 猜想本身，只否定特定类型的构造。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 55/100。

**原始英文摘要**

With any holomorphic vector bundle $E$ over a compact base one can associate a line bundle, denoted $O\_\{PE\}\(1\)$\. According to a conjecture of Griffiths, if $O\_\{PE\}\(1\)$ admits a positively curved hermitian metric $k$, then $E$ also admits a positively curved hermitian metric, $h$\. In this paper we show that, while the conjecture may be correct, it is not possible to obtain $h$ out of $k$ by a fiberwise construction that is functorial\.

---

### Parabolic Lie algebroid connections on parabolic principal bundles over curves

- **作者：** Indranil Biswas、Pritthijit Biswas
- **arXiv：** [2609\.01402](https://arxiv.org/abs/2609.01402) · [PDF](https://arxiv.org/pdf/2609.01402)
- **分类：** math\.AG、math\.DG
- **进展类型：** 存在性判据
- **阅读优先级：** 54/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

给出曲线上抛物主丛约化承载抛物 Lie algebroid 联络的充分判据。

**使用技术**

- 抛物主丛
- Lie algebroid 联络
- 无穷小刚性

**可能的突破**

证明抛物无穷小刚性推出联络存在，并覆盖 Harder--Narasimhan 约化。

**限制与不确定性**

要求锚映射非满且基底为紧 Riemann 曲线。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 54/100。

**原始英文摘要**

Let $X$ be a compact connected Riemann surface and $S\\,\\subset\\, X$ a finite subset\. We consider parabolic principal $G$--bundles $\\mathcal\{E\}\_\{G\}$ on $X$ with parabolic structure on $S$, where $G$ is a connected complex reductive affine algebraic group\. Let $P\\, \\subset\\, G$ be a parabolic subgroup and $\\mathcal\{E\}\_\{P\}\\, \\subset\\, \\mathcal\{E\}\_\{G\}$ a reduction of structure group of $\\mathcal\{E\}\_\{G\}$ to $P$\. We give a criterion for the existence of a parabolic Lie algebroid connection on $\\mathcal\{E\}\_\{P\}$ for any given parabolic Lie algebroid on $\(X,\\,S\)$ whose anchor map is not surjective\. More precisely, $\\mathcal\{E\}\_\{P\}$ admits a parabolic Lie algebroid connection if the reduction $\\mathcal\{E\}\_\{P\}\\, \\subset\\, \\mathcal\{E\}\_\{G\}$ is parabolically infinitesimally rigid\. In particular, the Harder--Narasimhan reduction of $\\mathcal\{E\}\_\{G\}$ admits a parabolic Lie algebroid connection\.

---

### Intrinsic Finite-Step Characterizations of Discrete General Helices

- **作者：** Dae Won Yoon、Chul Woo Lee、Jae won Lee
- **arXiv：** [2609\.00673](https://arxiv.org/abs/2609.00673) · [PDF](https://arxiv.org/pdf/2609.00673)
- **分类：** math\.DG
- **进展类型：** 新刻画
- **阅读优先级：** 47/100 · 低阅读优先级
- **分析深度：** 摘要级分析

**完成的工作**

用离散 Frenet 标架的转角与挠角给出三维多边形广义螺线的有限步内蕴判据。

**使用技术**

- 离散 Frenet 标架
- 守恒向量
- 球面切向示性

**可能的突破**

从局部有限步数据重建螺线轴和角度，并证明均匀采样时二阶收敛。

**限制与不确定性**

属于离散曲线的专门刻画，与曲率及度量极限主线联系有限。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 47/100。

本期靠后：对象是欧氏三维离散螺线的精细判据，适用面较窄。

**原始英文摘要**

We study polygonal general helices in Euclidean three-space using the turning and signed torsion angles of the discrete Frenet frame\. For helices whose axis is not orthogonal to the edge tangents, we prove that the global constant-angle condition is equivalent to the existence of a conserved Frenet-frame vector\. On the generic branch, elimination of the auxiliary coefficient yields an intrinsic finite-step compatibility relation involving three consecutive turning angles and two consecutive torsion angles\. Complementary phase and linear-subspace formulations cover the antipodal-binormal case\. These characterizations reconstruct the helical axis and the helix angle and yield a sharp bound for each turning angle\. We also give a spherical formulation through the tangent indicatrix: its vertices lie on a plane section of the unit sphere, which is a small circle in the non-orthogonal case, whereas the orthogonal case is exactly planar\. A nonconstant Frenet-data example illustrates the criterion\. Finally, for uniform chordal sampling of a smooth curve, the discrete Lancret-type quotient and the reconstructed helical direction converge with second-order accuracy\.

---

## 几何拓扑、低维流形与结

### Homeomorphisms of surfaces in $4$-manifolds

- **作者：** Anthony Conway、Daniel Kasprowski
- **arXiv：** [2609\.01545](https://arxiv.org/abs/2609.01545) · [PDF](https://arxiv.org/pdf/2609.01545)
- **分类：** math\.GT
- **进展类型：** 新定理/分类
- **阅读优先级：** 82/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

给出单连通四流形中局部平坦纽结曲面等价的充要条件，并处理多类阿贝尔结群情形。

**使用技术**

- 等变交叉形式
- 四维拓扑
- 消去与映射类群

**可能的突破**

把球面结果推广到任意亏格、非定向及带边界曲面，并得到 Möbius 带和同调圆盘的新唯一性判据。

**限制与不确定性**

若干完整分类要求结群为 Z\_d 或行列式为素数幂。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 82/100。

**原始英文摘要**

This paper establishes necessary and sufficient conditions for locally flat knotted surfaces in simply-connected $4$-manifolds to be equivalent\. For surfaces with knot group $\\mathbb\{Z\}\_d$, we extend results of Lee-Wilczynski from spheres to surfaces of arbitrary genus; the surfaces are permitted to be nonorientable and have boundary\. We prove that most projective planes with knot group $\\mathbb\{Z\}\_2$ and the same Euler number are determined by the equivariant intersection form of their exterior\. We also prove that knots with prime power determinants bound at most one Moebius band in $D^4$ with knot group $\\mathbb\{Z\}\_2$ and a given Euler number\. Cancellation results lead to new criteria for homologous discs to be equivalent rel\. boundary\. Finally, we determine the topological extendable mapping class group of knotted surfaces with abelian knot group\.

---

### Accessible CAT$\(-1\)$ groups of critical exponent less than one

- **作者：** Yong Hou
- **arXiv：** [2609\.00557](https://arxiv.org/abs/2609.00557) · [PDF](https://arxiv.org/pdf/2609.00557)
- **分类：** math\.GR、math\.GT
- **进展类型：** 新定理/分类
- **阅读优先级：** 68/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

刻画临界指数小于一的可达 CAT\(-1\) 离散群，证明其几何有限且虚自由。

**使用技术**

- CAT\(-1\) 几何
- 群作用边界
- 图群与可达性

**可能的突破**

给出临界指数一的尖锐间隙，并推出多类 Kleinian 群具有有限指数经典 Schottky 子群。

**限制与不确定性**

需要对有限子群的可达性；结论集中于临界指数严格小于一。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 68/100。

**原始英文摘要**

Let $X$ be proper CAT$\(-1\)$ and let $Γ\\le\\Isom\(X\)$ be finitely generated and discrete\. The sharp structural theorem states that, if $Γ$ is accessible over finite subgroups and $δ\_X\(Γ\)&lt;1$, then $Γ$ is geometrically finite and virtually free, has a finite graph of groups with finite edge groups and virtually cyclic infinite vertex groups, and $\\partialΓ\\toΛ\_Γ$ collapses exactly their conjugate two point boundaries\. The result is hereditary, and below $1/2$ every finitely generated subgroup is convex-cobounded \(\\cref\{thm:accessible-main\}\)\. Hence non-virtually-free accessible groups have $δ\_X\(Γ\)\\ge1$ \(\\cref\{cor:accessible-gap\}\)\. Consequences cover finitely presented groups, groups with uniformly bounded finite-subgroup orders, characteristic-zero linear groups, and Kleinian groups, also infinite parabolic-free Kleinian groups have finite-index classical Schottky subgroups \(\\cref\{cor:accessibility-extension,cor:linear-groups,cor:kleinian-classical\}\)\. Hence we cover substantial larger class than \\cite\{LiuWang2023\},\\cite\{Hou2001\}, also see \\cref\{rem:strictness-sharpness\}\. Finally, we also state consequences for finite JSJ representatives and hierarchies \(\\cref\{thm:JSJ,thm:hierarchy,cor:hierarchy-dimension\}\)\.

---

### Exact curve counting of given word length on the once-punctured torus

- **作者：** Filippo Baroni、David Fisac、Mingkun Liu
- **arXiv：** [2609\.01382](https://arxiv.org/abs/2609.01382) · [PDF](https://arxiv.org/pdf/2609.01382)
- **分类：** math\.GT、cs\.CG、math\.CO
- **进展类型：** 解决猜想
- **阅读优先级：** 68/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

给出一次穿孔环面上任意映射类群轨道内、指定字长曲线数目的精确公式。

**使用技术**

- 曲线计数
- 映射类群轨道
- 组合字长

**可能的突破**

解决 Chas 提出的精确曲线计数猜想。

**限制与不确定性**

目前对象限于一次穿孔环面，向更高复杂度曲面的推广未说明。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 68/100。

**原始英文摘要**

On the once-punctured torus, we give an exact formula for the number of curves in any given mapping class group orbit of given word length\. This settles a conjecture of Chas in \[Cha16\]\.

---

### Decompositions and diagrams of symplectic surfaces in Weinstein domains

- **作者：** Román Aranda、Patricia Cahn、Agniva Roy、Melissa Zhang
- **arXiv：** [2609\.00163](https://arxiv.org/abs/2609.00163) · [PDF](https://arxiv.org/pdf/2609.00163)
- **分类：** math\.GT
- **进展类型：** 新方法/构造
- **阅读优先级：** 62/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

建立四维 Weinstein 域中适当嵌入辛曲面的组合图示体系，并算法化联系多种曲面分解。

**使用技术**

- bridge position
- 双分解与 divides
- 单值化因子分解

**可能的突破**

统一带状解链图、桥双分解、shadow 图和 pointed monodromy，并给出沿正向曲面的分支覆盖表示。

**限制与不确定性**

方法针对 positive ascending surfaces；一般辛曲面能否纳入同一算法框架尚未说明。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 62/100。

**原始英文摘要**

We introduce combinatorial and diagrammatic methods for representing properly embedded symplectic surfaces in 4-dimensional Weinstein domains\. We show that positive ascending surfaces, which include complex curves in Stein domains and multisections of Lefschetz fibrations, can be placed in bridge position with respect to Islambouli--Starkston's bisection-with-divides structure on the Weinstein domain\. We algorithmically relate various decompositions of such surfaces, including transverse banded unlink diagrams, quasipositive factorizations, bridge bisections with divides, shadow diagrams \(curves on surfaces\), and pointed monodromy factorizations\. We also develop a new way to present branched covers of Weinstein domains along positive ascending surfaces, which, combined with work of Loi--Piergallini, recovers Islambouli--Starkston's result that every compact Weinstein domain admits a bisection with divides\.

---

### Higher smooth surgery structure sets of complex projective spaces, part II

- **作者：** Samuel Kalužný、Tibor Macko
- **arXiv：** [2609\.01505](https://arxiv.org/abs/2609.01505) · [PDF](https://arxiv.org/pdf/2609.01505)
- **分类：** math\.AT、math\.GT
- **进展类型：** 新定理/分类
- **阅读优先级：** 60/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

确定复射影空间高阶光滑 surgery structure set 的挠部分，并描述低维到拓扑版本的遗忘映射。

**使用技术**

- 光滑 surgery 理论
- structure set
- 映射类群

**可能的突破**

补全该系列的高阶结构计算，并给出低维复射影空间映射类群应用。

**限制与不确定性**

挠部分仍保留若干扩张问题，且低维应用范围有限。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 60/100。

**原始英文摘要**

We determine the torsion part of the higher smooth surgery structure sets of complex projective spaces \(up to some extension problems\) and complete the description of the forgetful map to their topological versions in low dimensions\. In addition, an application to mapping class groups of complex projective spaces in low dimensions is presented\.

---

### A survey on mapping class groups of 3-manifolds

- **作者：** Philipp Bader、Rachael Boyd、Giulia Carfora、Gabriel Corrigan、Daniel Galvin、Csaba Nagy、John Nicholson、Weizhe Niu、Isacco Nonino、Mark Pencovitch、Mark Powell
- **arXiv：** [2609\.00233](https://arxiv.org/abs/2609.00233) · [PDF](https://arxiv.org/pdf/2609.00233)
- **分类：** math\.GT
- **进展类型：** 综述/资源
- **阅读优先级：** 55/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

系统综述紧定向三流形映射类群的计算方法、主要结果及文献脉络。

**使用技术**

- JSJ 分解
- 素分解
- 几何化三流形

**可能的突破**

把不可约、几何化及分解情形的工具整理为可检索的统一入口。

**限制与不确定性**

属于综述性工作，不以新的主定理为核心。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 55/100。

**原始英文摘要**

We survey computations and tools concerning the mapping class group of a compact, oriented, connected 3-manifold $M$\. We provide a guide to the literature and sketch proofs for various families of irreducible and geometric 3-manifolds\. We also consider JSJ and prime decompositions of 3-manifolds, and consequences for their mapping class groups\.

---

### The $\\mathrm\{FK\}\_3$ knot polynomial

- **作者：** Stavros Garoufalidis、Shana Yunsheng Li
- **arXiv：** [2609\.01506](https://arxiv.org/abs/2609.01506) · [PDF](https://arxiv.org/pdf/2609.01506)
- **分类：** math\.GT
- **进展类型：** 新不变量/计算
- **阅读优先级：** 48/100 · 低阅读优先级
- **分析深度：** 摘要级分析

**完成的工作**

定义来自十二维偶发 Nichols 代数 FK3 的结多项式，并计算全部不超过十六交叉的结。

**使用技术**

- Nichols 代数
- 结多项式
- 有限结表计算

**可能的突破**

得到一个不是 Vassiliev 幂级数的新型结不变量并整理计算模式。

**限制与不确定性**

目前主要是有限表计算和模式观察，与既有强不变量的区分能力尚未系统比较。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 48/100。

本期靠后：工作以新多项式的有限普查为主，理论机制和几何主线影响尚不明确。

**原始英文摘要**

We present the knot polynomial associated to the 12-dimensional sporadic Nichols algebra $\\mathrm\{FK\}\_3$ with automorphism, compute it for all knots with $\\leq$ 16 crossings and discuss the found patterns\. This knot polynomial is not a Vassiliev power series\. We ponder how it compares to the knot polynomials that come from Lie algebras and their representations and what the other knot polynomials associated with the higher dimensional sporadic Nichols algebras are\.

---

### Multicrossing complex of knot and secant classes

- **作者：** Igor Nikonov
- **arXiv：** [2609\.00285](https://arxiv.org/abs/2609.00285) · [PDF](https://arxiv.org/pdf/2609.00285)
- **分类：** math\.GT
- **进展类型：** 新构造
- **阅读优先级：** 42/100 · 低阅读优先级
- **分析深度：** 摘要级分析

**完成的工作**

证明若干结的弦线和在 multicrossing 同调中定义不变量类。

**使用技术**

- multicrossing 同调
- 结弦线
- quandle 同调推广

**可能的突破**

为 multicrossing 同调提供一类可由几何弦线直接构造的不变量。

**限制与不确定性**

摘要极短，未说明这些类区分结的能力或与既有不变量的比较。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 42/100。

本期靠后：结果范围与辨别力尚未由摘要说明，对课题组当前几何分析方向的技术增量有限。

**原始英文摘要**

The multicrossing homology of a knot can be considered as a generalization of the homology of its fundamental quandle\. We show that certain sums of knot secants define invariant classes in the multicrossing homology\.

---

## 交叉方向与基础工具

### Ricci curvature for fluid models on the torus via Zeitlin's quantization

- **作者：** Sadashige Ishida、Alex Suri
- **arXiv：** [2609\.01259](https://arxiv.org/abs/2609.01259) · [PDF](https://arxiv.org/pdf/2609.01259)
- **分类：** math\.DG
- **进展类型：** 新方法/构造
- **阅读优先级：** 71/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

通过 Zeitlin 量子化定义二维环面 Hamilton 微分同胚群上的 Ricci 曲率，并研究其流体稳定性含义。

**使用技术**

- SU\(N\) 有限维逼近
- Zeitlin 量子化
- Arnold 流体几何

**可能的突破**

给出有限维 Ricci 张量公式及大 N 收敛数值证据，并扩展到多种流体状态空间。

**限制与不确定性**

关键无限维极限目前主要是猜想和数值证据，并非完整收敛定理。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 71/100。

**原始英文摘要**

Ricci curvature measures the average stability of geodesics under transverse perturbations, but how it should be defined in infinite dimensions is often unclear\. This paper proposes a definition of Ricci curvature on the space of Hamiltonian diffeomorphisms on the two-dimensional flat torus $\\mathrm\{HDiff\}\(\\mathbb\{T\}^2\)$, the state space for ideal fluids\. Our definition is based on Zeitlin's model, which approximates $\\mathrm\{HDiff\}\(\\mathbb\{T\}^2\)$ by finite-dimensional Lie groups $\\mathrm\{SU\}\(N\)$\. We derive a formula for the Ricci curvature tensor on $\\mathrm\{SU\}\(N\)$ and provide numerical evidence for its convergence in the large-$N$ limit to our conjectured finite value\. Additionally, we explore potential applications for hydrodynamics through the Lyapunov stability of gravest wave modes and Arnold's tradewind estimates for long-term weather predictability\. Our framework extends to a wide range of settings\. We demonstrate this by introducing Ricci curvature on the state spaces of fluids on rectangular domains, the Lagrangian averaged Euler equation induced by the $H^1$-Sobolev metric, and the quasi-geostrophic equation incorporating the Coriolis effect\.

---

### Rough differential equations on manifolds via natural bundles

- **作者：** Ivan Bělohlávek、Petr Čoupek
- **arXiv：** [2609\.01190](https://arxiv.org/abs/2609.01190) · [PDF](https://arxiv.org/pdf/2609.01190)
- **分类：** math\.PR、math\.DG
- **进展类型：** 新框架
- **阅读优先级：** 58/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

用自然丛建立流形上由完全分支粗糙路径驱动的粗糙微分方程坐标不变框架。

**使用技术**

- branched rough paths
- 自然丛
- Davie 型解

**可能的突破**

无需 shuffle 公式、括号扩张或附加流形结构即可证明存在唯一性及子流形不变判据。

**限制与不确定性**

属于随机/粗糙分析基础工具，几何应用尚未在摘要中展开。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 58/100。

**原始英文摘要**

In the article, a novel framework for rough differential equations on finite-dimensional smooth manifolds driven by branched rough paths is developed utilizing the theory of natural bundles\. The role of vector fields is played by sections of certain associated fiber bundles\. The solutions are defined in a generalized Davie sense via a local approximation in such a way that they are invariant under changes of coordinates\. Existence and uniqueness of the solutions is proved and a necessary and sufficient condition for the invariance of a submanifold for the solution is given\. The approach allows the treatment of rough differential equations driven by fully branched rough paths on manifolds without directly relying on a shuffle product formula, bracket extension, or the Connes-Kreimer Hopf algebra and without imposing additional structure on the manifold\.

---

### Dimensional reduction associated with unchanged direction trajectories in flat fiber Robertson Walker spacetimes

- **作者：** D\. de la Fuente、R\. M\. Rubio、J\. Torrente
- **arXiv：** [2609\.00229](https://arxiv.org/abs/2609.00229) · [PDF](https://arxiv.org/pdf/2609.00229)
- **分类：** math\.DG、gr-qc、math-ph
- **进展类型：** 新构造
- **阅读优先级：** 52/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

证明平坦纤维 Robertson--Walker 时空中的 unchanged-direction 观察者可嵌入三维全测地类时子流形。

**使用技术**

- Lorentz 几何
- Robertson--Walker 时空
- 全测地子流形

**可能的突破**

把一类观察者轨迹的动力学问题降维到三维全测地背景。

**限制与不确定性**

结论依赖欧氏纤维和特定轨迹条件，主要服务于数学相对论。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 52/100。

**原始英文摘要**

In this article, we establish a new dimensional reduction result in \(Galilean or Lorentzian\) Robertson Walker spacetimes with Euclidean fiber\. In this context, we prove that every unchanged direction observer can be embedded into a three dimensional totally geodesic timelike submanifold\.

---

### On Algebraic Integrability of Vector Fields with Rational Function Coefficients that Separate Variables

- **作者：** Przemysław Grabowski
- **arXiv：** [2609\.00974](https://arxiv.org/abs/2609.00974) · [PDF](https://arxiv.org/pdf/2609.00974)
- **分类：** math\.AG、math\.AC、math\.DG、math\.NT
- **进展类型：** 新定理/分类
- **阅读优先级：** 52/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

给出可分离变量有理系数向量场代数可积的充要条件，并写出全部可积系数和第一积分。

**使用技术**

- 模素数约化
- p-曲率
- 代数叶状结构

**可能的突破**

对该类叶状结构验证广义 Grothendieck--Katz p-曲率猜想。

**限制与不确定性**

限定在零特征域及系数可分离变量的特殊向量场。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 52/100。

**原始英文摘要**

We work over a field of characteristic zero - primarily over an algebraic closure of the field of rational numbers\. We prove a necessary and sufficient condition for a vector field whose coefficients are rational functions separating variables to be algebraically integrable, that is, the subring of rational functions killed by this vector field, its ring of first integrals, is of maximal possible dimension\. We do it arithmetically by reducing the vector field modulo almost all primes\. In particular, we verify the generalized Grothendieck--Katz p-curvature conjecture for foliations defined by these vector fields\. Finally, we use the outcome of that verification to provide explicit formulas for coefficients of all algebraically integrable vector fields separating variables, and their first integrals\.

---

### Chern--Simons Fluctuations and Information Geometry in Discrete Electromagnetism

- **作者：** Jean-Pierre Magnot
- **arXiv：** [2609\.00020](https://arxiv.org/abs/2609.00020) · [PDF](https://arxiv.org/pdf/2609.00020)
- **分类：** math-ph、hep-lat、math\.DG、physics\.data-an
- **进展类型：** 新方法/构造
- **阅读优先级：** 48/100 · 低阅读优先级
- **分析深度：** 摘要级分析

**完成的工作**

在闭定向三流形的 Whitney 离散电磁场上构造固定磁螺度偏置的统计态，并计算配分函数、相对熵与 Fisher 信息。

**使用技术**

- 单纯形 de Rham 复形
- Chern--Simons 泛函
- 信息几何

**可能的突破**

把精确离散规范对称性与螺度约束下的最小相对熵分布连接起来，并以螺度涨落刻画统计态的局部可区分性。

**限制与不确定性**

对象是条件推断态而非 Maxwell 动力学平衡；与几何三个主方向的直接联系较弱。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 48/100。

本期靠后：主要贡献位于离散电磁学和统计推断，与曲率、度量极限及几何拓扑主线关联较间接。

**原始英文摘要**

We construct helicity-conditioned statistical states for a Whitney-discretized electromagnetic field on a closed oriented three-manifold\. The simplicial de Rham complex provides exact discrete gauge symmetry, while the Whitney inner product separates exact, harmonic, and coexact sectors\. The spatial Abelian Chern--Simons functional is gauge invariant and depends only on the coexact potential\. After fixing harmonic modes, we introduce a helicity-biased Gaussian ensemble on the reduced electromagnetic phase space and derive explicit formulas for its admissible parameters, partition function, mean helicity, relative entropy, and Fisher information\. The distribution uniquely minimizes relative entropy under a prescribed mean-helicity constraint\. Its helicity susceptibility equals the variance of the discrete Chern--Simons functional and controls the local distinguishability of neighboring statistical states\. Because magnetic helicity is generally not conserved under unconstrained Maxwell dynamics, these states represent conditioned inference rather than dynamical equilibrium\.

---

### On Braided Differential Calculi and Quantum G-structures

- **作者：** Antonio Del Donno、Giovanni Gava、Emanuele Latini、Thomas Weber
- **arXiv：** [2609\.01401](https://arxiv.org/abs/2609.01401) · [PDF](https://arxiv.org/pdf/2609.01401)
- **分类：** math\.QA、math\.CT、math\.DG、math\.RA
- **进展类型：** 新框架
- **阅读优先级：** 45/100 · 低阅读优先级
- **分析深度：** 摘要级分析

**完成的工作**

发展编织幺半范畴中的一阶微分演算，并引入量子 G-结构与量子 frame resolution。

**使用技术**

- braided Hopf 代数
- Maurer--Cartan 形式
- 量子主丛

**可能的突破**

统一协变演算、transmutation 和 Radford--Majid 双积，并给出量子 G-结构的结构性定义。

**限制与不确定性**

高度抽象且主要服务量子代数，与本期经典几何问题关联较弱。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 45/100。

本期靠后：属于量子 Hopf 代数上的基础理论，对当前曲率和度量测度研究的直接可复用性有限。

**原始英文摘要**

We develop a theory of first order differential calculi in braided monoidal categories and classify braided covariant and bicovariant calculi on braided Hopf algebras\. We show that, under certain conditions, bicovariant calculi can be transmuted to braided bicovariant calculi\. For Radford--Majid biproducts, we combine bicovariant calculi on a Hopf algebra and braided bicovariant calculi on the corresponding braided Hopf algebra to covariant smash product calculi\. The associated Maurer--Cartan form is shown to decompose into a direct sum of the Maurer--Cartan forms of the structure Hopf algebra of the quantum principal bundle and the braided Hopf algebra on the base\. Geometrically, this construction realises the quantum affine extension of a given Hopf algebra, and we prove that the resulting quantum principal bundle is equipped with a frame resolution induced by the quantum Maurer--Cartan form\. Building on this correspondence, we introduce and develop the notion of quantum $\\textrm\{G\}$-structure, proving that quantum $\\textrm\{G\}$-structures are quantum frame resolutions on the reduction\. The theory is illustrated by examples based on transmutations of higher analogues of Sweedler's Hopf algebra and on the braided quantum plane, seen as a Yetter--Drinfeld module of $O\_q\(\\mathrm\{GL\}\_2\)$\.

---

### An adjunction of the categories of sheaves related to a topology and a diffeology

- **作者：** Masai Noda
- **arXiv：** [2609\.00770](https://arxiv.org/abs/2609.00770) · [PDF](https://arxiv.org/pdf/2609.00770)
- **分类：** math\.CT、math\.DG
- **进展类型：** 基础工具
- **阅读优先级：** 42/100 · 低阅读优先级
- **分析深度：** 摘要级分析

**完成的工作**

构造拓扑空间与微分空间上的层范畴之间的两对函子，并说明其经单位与余单位修正后的伴随关系。

**使用技术**

- diffeology
- 层范畴
- 伴随函子

**可能的突破**

在不存在自然站点函子的情况下直接建立层层面的伴随结构。

**限制与不确定性**

工作主要位于范畴与层论基础，对本期几何分析问题的直接应用尚未展示。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 42/100。

本期靠后：属于抽象层论基础建设，与课题组当前曲率和度量主题距离较远。

**原始英文摘要**

There exists an adjoint pair \(D, C\) of functors between the category of diffeological spaces and that of topological spaces\. In this article, by using the functors, we introduce two pairs of functors between the categories of sheaves on a diffeological space and on a topological space\. Then, the adjointness of the novel functors up to the functors induced by the unit and counit of C and D is clarified\. There is no natural functor between sites obtained by a diffeological space and a topological space\. Therefore, the adjunctions on the categories of sheaves are elaborated without applying the general theory of topoi\.

---

## 明确披露 AI 协作

## 曲率与比较几何

### Macroscopic scalar curvature bounds on surfaces

- **作者：** Otis Chodosh、Noa Vikman
- **arXiv：** [2609\.00186](https://arxiv.org/abs/2609.00186) · [PDF](https://arxiv.org/pdf/2609.00186)
- **分类：** math\.DG、math\.MG
- **进展类型：** 新定理/分类
- **阅读优先级：** 82/100 · 高优先级
- **分析深度：** 摘要级分析

**完成的工作**

宣称在二维证明广义 Geroch 猜想及其双曲对应命题。

**使用技术**

- 宏观标量曲率
- 二维曲面几何
- AI 生成证明的人工呈现

**可能的突破**

若证明核验无误，将解决二维宏观标量曲率的两个重要猜想。

**限制与不确定性**

摘要没有给出假设和证明路线，且作者明确说明展示的是 AI 生成证明，关键论证需要独立复核。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 82/100。

**AI 协作披露**

作者评论明确写明“Presentation of AI generated proof”。

来源：arXiv 元数据 Comments 字段

**原始英文摘要**

We prove the generalized Geroch conjecture, and the corresponding hyperbolic conjecture, in dimension two\.

---

## 几何拓扑、低维流形与结

### Lipshitz-Sarkar refines mirrors more than Khovanov

- **作者：** Yang-Hui He
- **arXiv：** [2609\.00976](https://arxiv.org/abs/2609.00976) · [PDF](https://arxiv.org/pdf/2609.00976)
- **分类：** math\.GT、hep-th、math\.QA
- **进展类型：** 反例/计算
- **阅读优先级：** 65/100 · 中优先级
- **分析深度：** 摘要级分析

**完成的工作**

构造普通整系数 Khovanov 同调不能区分镜像、但 Lipshitz--Sarkar 同伦精化可由 Steenrod 平方区分的素结。

**使用技术**

- Khovanov 同伦类型
- Steenrod 平方
- Regina 结普查计算

**可能的突破**

肯定回答 Lipshitz--Sarkar 的 ICM 问题，并给出素结和复合结例子。

**限制与不确定性**

结论依赖计算搜索与指定双分次中的秩验证；作者披露使用 AI 协助搜索和计算。

**排序理由**

按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 65/100。

**AI 协作披露**

摘要明确说明构造、搜索与计算借助 chat-GTP 5\.6 sol Pro 完成。

来源：arXiv 摘要

**原始英文摘要**

Lipshitz and Sarkar asked in an ICM 2018 question whether their homotopy-theoretic refinement of Khovanov homology can detect mirror reflection when ordinary integral Khovanov homology cannot\. We give an affirmative answer by presenting a prime knot whose integral Khovanov homology agrees with that of its mirror in every bidegree, including torsion, and yet over $\\mathbb\{F\}\_2$, the second Steenrod square has rank one for the knot and rank zero for its mirror in a specified bidegree\. We also give a composite example\. The construction, search and computations are done with the help of \{\\it chat-GTP 5\.6 sol Pro\} combing over the \{\\it Regina Census\} of knots\.

---
